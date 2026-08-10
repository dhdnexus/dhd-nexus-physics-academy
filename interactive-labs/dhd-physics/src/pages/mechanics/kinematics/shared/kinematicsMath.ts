export type KinematicPoint = { t: number; x: number; v: number; a: number };

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const round = (value: number, places = 2) => {
  const factor = 10 ** places;
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;
  return Object.is(rounded, -0) ? 0 : rounded;
};

export const findNearestPoint = (points: KinematicPoint[], time: number) => {
  if (points.length === 0) throw new Error("Cannot find a point in an empty kinematics sample.");
  return points.reduce((closest, point) => Math.abs(point.t - time) < Math.abs(closest.t - time) ? point : closest);
};

export const sampleConstantAcceleration = (initialVelocity: number, acceleration: number, duration: number, initialPosition = 0, samples = 121): KinematicPoint[] => {
  const safeDuration = Math.max(duration, 0);
  const sampleCount = Math.max(2, Math.floor(samples));
  return Array.from({ length: sampleCount }, (_, index) => {
    const t = (safeDuration * index) / (sampleCount - 1);
    return { t, x: initialPosition + initialVelocity * t + 0.5 * acceleration * t * t, v: initialVelocity + acceleration * t, a: acceleration };
  });
};

export const accelerationMeaning = (initialVelocity: number, acceleration: number) => {
  if (acceleration === 0) return "Velocity is constant: acceleration is zero.";
  if (initialVelocity === 0) return acceleration > 0 ? "The object starts by moving in the positive direction." : "The object starts by moving in the negative direction.";
  if (initialVelocity * acceleration < 0) return "Acceleration opposes the initial velocity: the object slows, stops, and may reverse direction.";
  return "Acceleration and initial velocity point in the same direction, so the object speeds up.";
};
