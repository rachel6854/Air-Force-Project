
const distanceBetween = (
  {x: x1, y: y1}: any,
  {x: x2, y: y2}: any
): number => Math.hypot(x2 - x1, y2 - y1);

export {distanceBetween};
