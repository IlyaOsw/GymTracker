export const getBMIDescription = (bmi: number, t: (key: string) => string) => {
  if (bmi < 16.0) return t("severeUnderweight");
  if (bmi >= 16.0 && bmi <= 16.9) return t("underweight");
  if (bmi >= 17.0 && bmi <= 18.4) return t("mildUnderweight");
  if (bmi >= 18.5 && bmi <= 24.9) return t("normalWeight");
  if (bmi >= 25.0 && bmi <= 29.9) return t("overweight");
  if (bmi >= 30.0 && bmi <= 34.9) return t("obesity1");
  if (bmi >= 35.0 && bmi <= 39.9) return t("obesity2");
  if (bmi >= 40.0) return t("obesity3");
  return "";
};
