export const calculateAge = (dateOfBirth: Date | null) => {
  if (dateOfBirth === null) {
    return 0;
  }

  const currentDate = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
