// content/schema/lessonSpec.types.ts
//
// The DHD Nexus Lesson Specification: a manifest/registry of learning
// intent, metadata, relationships, and artifact references.
//
// It is explicitly NOT a database, NOT a UI schema, NOT raw JSX or
// presentation markup, and NOT the complete lesson narrative. It exists
// to make the *relationships* between curriculum, pedagogy, and
// artifacts inspectable, versionable, and validatable in plain text.
//
// This schema is frozen: every field a Lesson Specification can carry
// is named explicitly below. There is no open-ended
// `[key: string]: unknown` escape hatch — an author (human or AI)
// cannot introduce a speculative property that silently passes
// validation. If a new field is genuinely needed, it is added here,
// deliberately, not invented ad hoc in a YAML file.
//
// Field tiers (match the DHD Nexus Foundation Implementation Brief §C):
//   Required    — every Lesson Specification must provide these.
//   Recommended — strongly encouraged where applicable; optional in the type.
//   Optional    — genuinely may not apply to every lesson.
//   Derived     — never authored here; computed later from these fields
//                 by tooling (e.g. a prerequisite graph, navigation
//                 relationships, artifact-availability summaries). No
//                 derived field appears in this file on purpose.

import type { ArtifactReference } from "./artifact.types";

export type Stream = "concept" | "examination";

export type Difficulty = "introductory" | "intermediate" | "advanced";

export const STREAMS: readonly Stream[] = ["concept", "examination"];

export const DIFFICULTIES: readonly Difficulty[] = [
  "introductory",
  "intermediate",
  "advanced",
];

// ---------------------------------------------------------------------------
// 3+7 Interaction Standard (brief §F)
// ---------------------------------------------------------------------------

/**
 * The three mandatory pedagogical anchors. Every meaningful interactive
 * learning experience must define what a student predicts, explores,
 * and reflects on — the exact UI is left to the Web Lab implementation,
 * but the pedagogical intent must be stated here.
 */
export interface InteractionAnchors {
  predict: string;
  explore: string;
  reflect: string;
}

/**
 * The seven optional interaction modules. Typed so they're checked when
 * present, but never required — forcing all ten stages into every
 * lesson was the exact rigidity the Gemini review flagged.
 */
export interface InteractionExtensions {
  activate?: string;
  observe?: string;
  model?: string;
  apply?: string;
  test?: string;
  retrieve?: string;
  explain?: string;
}

export type Instruction = InteractionAnchors & InteractionExtensions;

// ---------------------------------------------------------------------------
// Curriculum relationships (brief §D) — flat identifiers, no graph.
// ---------------------------------------------------------------------------

/** e.g. { ccmas: "PHY101", traditional: "PHYS-101-KIN" } — flat, string values only. */
export type CurriculumMap = Record<string, string>;

export interface AssessmentRelationship {
  /** The id of one of THIS lesson's own artifacts (see `artifacts` below). */
  artifactId: string;
  /** What this lesson contributes toward that assessment artifact. */
  relationship: string;
}

// ---------------------------------------------------------------------------
// The Lesson Specification
// ---------------------------------------------------------------------------

export interface LessonSpecification {
  // ---- Required -------------------------------------------------------
  /** Stable, dotted identifier. Example: "mechanics.kinematics.acceleration" */
  id: string;
  title: string;
  domain: string;
  topic: string;
  /** One or two sentences: what this lesson is for. */
  description: string;
  /** What a student should be able to do after this lesson. */
  objectives: string[];
  /** Concept IDs (from content/curriculum/concepts.yaml) this lesson assumes. */
  prerequisites: string[];
  artifacts: ArtifactReference[];
  stream: Stream;
  /**
   * Required per the 3+7 model (brief §F/§5): the three pedagogical
   * anchors must be stated for every lesson. The seven extension
   * fields inside `Instruction` remain optional.
   */
  instruction: Instruction;

  // ---- Recommended ------------------------------------------------------
  misconceptions?: string[];
  curriculumMaps?: CurriculumMap;
  /** Concept/lesson IDs this lesson leads toward. */
  bridges?: string[];
  physicsConventions?: string[];
  assessmentRelationships?: AssessmentRelationship[];
  difficulty?: Difficulty;
  estimatedMinutes?: number;

  // ---- Optional ---------------------------------------------------------
  retrievalItems?: string[];
  remediationReferences?: string[];
  instructorNotes?: string;
  extensionActivities?: string[];
}
