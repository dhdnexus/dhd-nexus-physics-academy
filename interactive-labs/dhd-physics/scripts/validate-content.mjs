#!/usr/bin/env node
// scripts/validate-content.mjs
//
// Validates the DHD Nexus content layer (lesson specifications,
// misconception registry, curriculum concept registry) against the
// frozen schema described in content/schema/*.types.ts.
//
// This script is Node-only and dev-only. It parses YAML with the
// `yaml` devDependency, which is never imported into the React/browser
// application — the shipped client bundle is unaffected.
//
// Usage:
//   node scripts/validate-content.mjs [contentRoot]
//
// contentRoot defaults to "content" (relative to the repository root,
// i.e. where this script is invoked from via `npm run validate:content`).
// A different root can be passed for testing against a fixture
// directory without touching production content.
//
// Exit code is 0 when everything validates, non-zero otherwise.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { parse as parseYaml } from "yaml";

const ARTIFACT_TYPES = new Set([
  "web-lab",
  "manim",
  "marimo",
  "video",
  "worked-example",
  "exam-question",
  "retrieval-item",
  "written",
]);

const ARTIFACT_STATUSES = new Set(["implemented", "in-progress", "planned"]);
const STREAMS = new Set(["concept", "examination"]);
const DIFFICULTIES = new Set(["introductory", "intermediate", "advanced"]);

const REQUIRED_LESSON_FIELDS = [
  "id",
  "title",
  "domain",
  "topic",
  "description",
  "objectives",
  "prerequisites",
  "artifacts",
  "stream",
  "instruction",
];

const REQUIRED_INSTRUCTION_ANCHORS = ["predict", "explore", "reflect"];

// The frozen Lesson Specification schema (content/schema/lessonSpec.types.ts)
// has no `[key: string]: unknown` escape hatch — every field a spec can
// carry is named explicitly there. This allowlist mirrors that field set
// exactly, so a YAML file cannot silently smuggle in a property the
// TypeScript schema never defined.
const ALLOWED_LESSON_FIELDS = new Set([
  // Required
  "id",
  "title",
  "domain",
  "topic",
  "description",
  "objectives",
  "prerequisites",
  "artifacts",
  "stream",
  "instruction",
  // Recommended
  "misconceptions",
  "curriculumMaps",
  "bridges",
  "physicsConventions",
  "assessmentRelationships",
  "difficulty",
  "estimatedMinutes",
  // Optional
  "retrievalItems",
  "remediationReferences",
  "instructorNotes",
  "extensionActivities",
]);

// Mirrors InteractionAnchors & InteractionExtensions in lessonSpec.types.ts.
const ALLOWED_INSTRUCTION_FIELDS = new Set([
  "predict",
  "explore",
  "reflect",
  "activate",
  "observe",
  "model",
  "apply",
  "test",
  "retrieve",
  "explain",
]);

// Mirrors ArtifactReference in artifact.types.ts.
const ALLOWED_ARTIFACT_FIELDS = new Set(["id", "type", "status", "location", "label"]);

// Mirrors AssessmentRelationship in lessonSpec.types.ts.
const ALLOWED_ASSESSMENT_RELATIONSHIP_FIELDS = new Set(["artifactId", "relationship"]);

const contentRoot = process.argv[2] ?? "content";
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

/**
 * Reports every key in `obj` that isn't in `allowed`. This is what makes
 * the frozen schema actually closed at the YAML layer, not just in the
 * TypeScript types — an invented field is rejected, not ignored.
 */
function rejectUnknownFields(obj, allowed, context) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) {
      fail(`${context}: unknown field "${key}" is not part of the frozen schema`);
    }
  }
}

function readYamlFile(path) {
  const raw = readFileSync(path, "utf8");
  try {
    return parseYaml(raw);
  } catch (cause) {
    fail(`${path}: malformed YAML \u2014 ${cause.message}`);
    return null;
  }
}

function listYamlFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".yaml") || name.endsWith(".yml"))
    .map((name) => join(dir, name));
}

// ---------------------------------------------------------------------------
// Load the curriculum concept registry
// ---------------------------------------------------------------------------

const conceptsPath = join(contentRoot, "curriculum", "concepts.yaml");
let knownConceptIds = new Set();

// The concept registry is mandatory, not optional: prerequisite/bridge
// validation below always checks against it, unconditionally. A missing
// or malformed registry must fail validation loudly here rather than
// silently letting every prerequisite/bridge check evaporate.
if (!existsSync(conceptsPath)) {
  fail(`${conceptsPath}: required curriculum concept registry is missing`);
} else {
  const doc = readYamlFile(conceptsPath);
  if (doc && Array.isArray(doc.concepts)) {
    const seen = new Set();
    for (const concept of doc.concepts) {
      if (!concept || typeof concept.id !== "string") {
        fail(`${conceptsPath}: concept entry missing string "id"`);
        continue;
      }
      if (seen.has(concept.id)) {
        fail(`${conceptsPath}: duplicate concept id "${concept.id}"`);
      }
      seen.add(concept.id);
    }
    knownConceptIds = seen;
  } else if (doc) {
    fail(`${conceptsPath}: expected a top-level "concepts" array`);
  }
  // If doc is null, readYamlFile already recorded a malformed-YAML error.
}

// ---------------------------------------------------------------------------
// Load the misconception registry
// ---------------------------------------------------------------------------

const misconceptionFiles = listYamlFiles(join(contentRoot, "misconceptions"));
const knownMisconceptionIds = new Set();

for (const path of misconceptionFiles) {
  const doc = readYamlFile(path);
  if (!doc) continue;
  if (typeof doc.id !== "string") {
    fail(`${path}: missing required string field "id"`);
    continue;
  }
  if (basename(path).replace(/\.ya?ml$/, "") !== doc.id) {
    warnings.push(`${path}: filename does not match id "${doc.id}"`);
  }
  if (knownMisconceptionIds.has(doc.id)) {
    fail(`${path}: duplicate misconception id "${doc.id}"`);
  }
  knownMisconceptionIds.add(doc.id);
  if (typeof doc.statement !== "string" || !doc.statement.trim()) {
    fail(`${path}: missing required string field "statement"`);
  }
  if (typeof doc.correction !== "string" || !doc.correction.trim()) {
    fail(`${path}: missing required string field "correction"`);
  }
}

// ---------------------------------------------------------------------------
// Load and validate lesson specifications
// ---------------------------------------------------------------------------

const lessonFiles = listYamlFiles(join(contentRoot, "lessons"));
const seenLessonIds = new Set();

for (const path of lessonFiles) {
  const doc = readYamlFile(path);
  if (!doc) continue;

  // --- Structural: required fields present -------------------------------
  for (const field of REQUIRED_LESSON_FIELDS) {
    if (doc[field] === undefined || doc[field] === null) {
      fail(`${path}: missing required field "${field}"`);
    }
  }

  // --- Structural: no fields outside the frozen schema --------------------
  rejectUnknownFields(doc, ALLOWED_LESSON_FIELDS, path);

  if (errors.some((e) => e.startsWith(path))) {
    // Missing required fields makes further checks unreliable for this file.
    continue;
  }

  // --- Identity: duplicate lesson id --------------------------------------
  if (typeof doc.id !== "string" || !doc.id.trim()) {
    fail(`${path}: "id" must be a non-empty string`);
  } else if (seenLessonIds.has(doc.id)) {
    fail(`${path}: duplicate lesson id "${doc.id}"`);
  } else {
    seenLessonIds.add(doc.id);
  }

  // --- Structural: field types ---------------------------------------------
  if (typeof doc.title !== "string" || !doc.title.trim()) fail(`${path}: "title" must be a non-empty string`);
  if (typeof doc.domain !== "string" || !doc.domain.trim()) fail(`${path}: "domain" must be a non-empty string`);
  if (typeof doc.topic !== "string" || !doc.topic.trim()) fail(`${path}: "topic" must be a non-empty string`);
  if (typeof doc.description !== "string" || !doc.description.trim()) fail(`${path}: "description" must be a non-empty string`);
  if (!Array.isArray(doc.objectives) || doc.objectives.length === 0) fail(`${path}: "objectives" must be a non-empty array`);
  if (!Array.isArray(doc.prerequisites)) fail(`${path}: "prerequisites" must be an array`);
  if (!Array.isArray(doc.artifacts) || doc.artifacts.length === 0) fail(`${path}: "artifacts" must be a non-empty array`);
  if (!STREAMS.has(doc.stream)) fail(`${path}: "stream" must be one of ${[...STREAMS].join(", ")}`);
  if (doc.difficulty !== undefined && !DIFFICULTIES.has(doc.difficulty)) {
    fail(`${path}: "difficulty" must be one of ${[...DIFFICULTIES].join(", ")}`);
  }

  // --- Structural: instruction (3+7 model) ----------------------------------
  const instruction = doc.instruction ?? {};
  for (const anchor of REQUIRED_INSTRUCTION_ANCHORS) {
    if (typeof instruction[anchor] !== "string" || !instruction[anchor].trim()) {
      fail(`${path}: "instruction.${anchor}" is required and must be a non-empty string`);
    }
  }
  rejectUnknownFields(instruction, ALLOWED_INSTRUCTION_FIELDS, `${path}: instruction`);

  // --- Structural + relationship: artifacts ---------------------------------
  const ownArtifactIds = new Set();
  if (Array.isArray(doc.artifacts)) {
    for (const artifact of doc.artifacts) {
      if (!artifact || typeof artifact.id !== "string") {
        fail(`${path}: artifact entry missing string "id"`);
        continue;
      }
      if (ownArtifactIds.has(artifact.id)) {
        fail(`${path}: duplicate artifact id "${artifact.id}" within this lesson`);
      }
      ownArtifactIds.add(artifact.id);
      if (!ARTIFACT_TYPES.has(artifact.type)) {
        fail(`${path}: artifact "${artifact.id}" has invalid type "${artifact.type}" (must be one of ${[...ARTIFACT_TYPES].join(", ")})`);
      }
      if (!ARTIFACT_STATUSES.has(artifact.status)) {
        fail(`${path}: artifact "${artifact.id}" has invalid status "${artifact.status}" (must be one of ${[...ARTIFACT_STATUSES].join(", ")})`);
      }
      if (typeof artifact.label !== "string" || !artifact.label.trim()) {
        fail(`${path}: artifact "${artifact.id}" missing required "label"`);
      }
      rejectUnknownFields(artifact, ALLOWED_ARTIFACT_FIELDS, `${path}: artifact "${artifact.id}"`);
    }
  }

  // --- Relationship: prerequisites resolve against the concept registry ----
  // Always checked — never gated on registry size. A missing/malformed
  // registry is already a top-level failure (see above); an empty-but-
  // valid registry correctly fails every reference here too.
  if (Array.isArray(doc.prerequisites)) {
    for (const prereq of doc.prerequisites) {
      if (!knownConceptIds.has(prereq)) {
        fail(`${path}: prerequisite "${prereq}" is not a known concept (see content/curriculum/concepts.yaml)`);
      }
    }
  }

  // --- Relationship: bridges resolve against the concept registry ----------
  if (Array.isArray(doc.bridges)) {
    for (const bridge of doc.bridges) {
      if (!knownConceptIds.has(bridge)) {
        fail(`${path}: bridge "${bridge}" is not a known concept (see content/curriculum/concepts.yaml)`);
      }
    }
  }

  // --- Relationship: misconceptions resolve against the misconception registry
  if (Array.isArray(doc.misconceptions)) {
    for (const misconceptionId of doc.misconceptions) {
      if (!knownMisconceptionIds.has(misconceptionId)) {
        fail(`${path}: misconception "${misconceptionId}" has no matching file in content/misconceptions/`);
      }
    }
  }

  // --- Relationship: assessmentRelationships reference this lesson's own artifacts
  if (Array.isArray(doc.assessmentRelationships)) {
    for (const rel of doc.assessmentRelationships) {
      if (!rel || !ownArtifactIds.has(rel.artifactId)) {
        fail(`${path}: assessmentRelationships entry references unknown artifactId "${rel?.artifactId}"`);
      } else {
        rejectUnknownFields(rel, ALLOWED_ASSESSMENT_RELATIONSHIP_FIELDS, `${path}: assessmentRelationships entry`);
      }
    }
  }

  // --- Curriculum: curriculumMaps must be a flat string->string object -----
  if (doc.curriculumMaps !== undefined) {
    if (typeof doc.curriculumMaps !== "object" || Array.isArray(doc.curriculumMaps) || doc.curriculumMaps === null) {
      fail(`${path}: "curriculumMaps" must be a flat object`);
    } else {
      for (const [board, code] of Object.entries(doc.curriculumMaps)) {
        if (typeof code !== "string") {
          fail(`${path}: curriculumMaps."${board}" must be a string, got ${typeof code}`);
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

if (warnings.length > 0) {
  console.warn(`\u26a0 ${warnings.length} warning(s):`);
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (errors.length > 0) {
  console.error(`\u2716 Content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `\u2713 Content validation passed \u2014 ${lessonFiles.length} lesson(s), ${misconceptionFiles.length} misconception(s), ${knownConceptIds.size} concept(s).`,
);
process.exit(0);
