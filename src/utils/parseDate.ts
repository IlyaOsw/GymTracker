export const parseDate = (dateString: string): Date | undefined => {
  const [day, month, year] = dateString.split(".").map(Number);

  if (!day || !month || !year) return undefined;
  return new Date(year, month - 1, day);
};
