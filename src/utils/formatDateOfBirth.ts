export const formatDateOfBirth = (dateOfBirth: any) => {
  if (!dateOfBirth) return "";

  const timestamp = dateOfBirth.seconds
    ? dateOfBirth.seconds * 1000
    : dateOfBirth * 1000;
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
