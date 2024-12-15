export const handleDateChange =
  (setter: (date: string) => void) => (value: Date) => {
    setter(
      value.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );
  };
