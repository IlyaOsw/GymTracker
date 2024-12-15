export const calculateProgress = (
  currentValue?: number,
  startWeight?: number,
  goalWeight?: number
): string => {
  if (
    currentValue === undefined ||
    startWeight === undefined ||
    goalWeight === undefined ||
    startWeight === goalWeight
  ) {
    return "0.0";
  }

  const progress = Math.min(
    ((currentValue - startWeight) / (goalWeight - startWeight)) * 100,
    100
  );

  return progress.toFixed(1);
};
