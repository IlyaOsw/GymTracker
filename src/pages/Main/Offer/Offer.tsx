import React from "react";
import { useTranslation } from "react-i18next";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "components/DescriptionText/DescriptionText";

import { CustomCard } from "./CustomCard/CustomCard";

export const Offer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <DescriptionTitle text={t("offerTitle")} textAlign="center" />
      <DescriptionText text={t("offerDescription")} textAlign="center" />
      <CustomCard />
    </>
  );
};
