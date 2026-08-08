import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { initialLessonState } from "./lessonState";
import type { LessonState, RouteType } from "./lessonState";

type LessonContextType = {
  lesson: LessonState;

  setLesson: Dispatch<SetStateAction<LessonState>>;

  setPosition: (position: number) => void;

  setRoute: (route: RouteType) => void;

  resetExperiment: () => void;
};

const LessonContext = createContext<LessonContextType | null>(null);

/* -------------------------------------------------- */
/* Physics Engine                                     */
/* -------------------------------------------------- */

function calculateDistance(route: RouteType, start: number, finish: number) {
  const displacement = finish - start;

  switch (route) {
    case "direct":
      return Math.abs(displacement);

    case "detour": {
      // Simulated right-angle detour.
      const vertical = 3;
      const horizontal = Math.abs(displacement);

      return vertical + horizontal + vertical;
    }

    case "return": {
      // Overshoot by 4 m before returning.

      const overshoot = 4;

      return Math.abs(displacement) + overshoot * 2;
    }

    default:
      return Math.abs(displacement);
  }
}

export function LessonProvider({ children }: { children: ReactNode }) {
  const [lesson, setLesson] = useState<LessonState>(initialLessonState);

  function setPosition(position: number) {
    const displacement = position - lesson.initialPosition;

    const distance = calculateDistance(
      lesson.route,
      lesson.initialPosition,
      position,
    );

    setLesson({
      ...lesson,

      currentPosition: position,

      finalPosition: position,

      displacement,

      distanceTravelled: distance,
    });
  }

  function setRoute(route: RouteType) {
    const distance = calculateDistance(
      route,
      lesson.initialPosition,
      lesson.currentPosition,
    );

    setLesson({
      ...lesson,

      route,

      displacement: lesson.currentPosition - lesson.initialPosition,

      distanceTravelled: distance,
    });
  }

  function resetExperiment() {
    setLesson(initialLessonState);
  }

  const value = useMemo(
    () => ({
      lesson,

      setLesson,

      setPosition,

      setRoute,

      resetExperiment,
    }),
    [lesson],
  );

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
}

export function useLesson() {
  const context = useContext(LessonContext);

  if (!context) {
    throw new Error("useLesson must be used inside LessonProvider.");
  }

  return context;
}
