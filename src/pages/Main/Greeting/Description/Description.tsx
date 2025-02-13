import React from "react";
import { useTranslation } from "react-i18next";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "components/DescriptionText/DescriptionText";

export const Description: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ width: "100%", maxWidth: "500px" }}>
      <DescriptionTitle text={t("descriptionTitle")} textAlign="start" />
      <DescriptionText text={t("descriptionText")} textAlign="start" />
    </div>
  );
};
