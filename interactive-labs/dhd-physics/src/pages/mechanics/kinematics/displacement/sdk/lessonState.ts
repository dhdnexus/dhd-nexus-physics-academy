export type RouteType = "direct" | "detour" | "return";

export interface LessonState {
  route: RouteType;

  progress: number;

  initialPosition: number;

  currentPosition: number;

  finalPosition: number;

  displacement: number;

  distanceTravelled: number;

  playing: boolean;
}

export const initialLessonState: LessonState = {
  route: "direct",

  progress: 0,

  initialPosition: -4,

  currentPosition: -4,

  finalPosition: 6,

  displacement: 10,

  distanceTravelled: 10,

  playing: false,
};
