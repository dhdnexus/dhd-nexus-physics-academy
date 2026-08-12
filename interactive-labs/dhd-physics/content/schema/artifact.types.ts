// content/schema/artifact.types.ts
//
// Closed artifact-type contract for DHD Nexus Lesson Specifications.
//
// A Lesson Specification references artifacts by stable ID and type.
// The artifact's actual implementation — a React Web Lab component, a
// Manim scene, a Marimo notebook, a video file, written content, an
// exam question, a retrieval item — lives entirely outside this
// manifest. This file only defines the shape of the *reference*, never
// the artifact's content.
//
// The type field is a closed enum on purpose (per the Gemini review):
// an open string here would let a lesson spec invent artifact kinds
// that no part of the system knows how to resolve or render.

export type ArtifactType =
  | "web-lab"
  | "manim"
  | "marimo"
  | "video"
  | "worked-example"
  | "exam-question"
  | "retrieval-item"
  | "written";

export const ARTIFACT_TYPES: readonly ArtifactType[] = [
  "web-lab",
  "manim",
  "marimo",
  "video",
  "worked-example",
  "exam-question",
  "retrieval-item",
  "written",
];

// "implemented"  — the artifact exists and is reachable at `location`.
// "in-progress"  — under active work; `location` may or may not exist yet.
// "planned"      — acknowledged as needed, nothing built yet.
export type ArtifactStatus = "implemented" | "in-progress" | "planned";

export const ARTIFACT_STATUSES: readonly ArtifactStatus[] = [
  "implemented",
  "in-progress",
  "planned",
];

export interface ArtifactReference {
  /** Stable identifier for this artifact. Unique within the lesson that declares it. */
  id: string;
  type: ArtifactType;
  status: ArtifactStatus;
  /**
   * Where to find it: an application route for a "web-lab" (e.g.
   * "/mechanics/kinematics/acceleration"), or a relative file path for
   * a Manim/Marimo/video/written asset. Optional because a "planned"
   * artifact may not have a location yet.
   */
  location?: string;
  /** Short human-readable label, e.g. "Acceleration Web Lab". */
  label: string;
}
