import { Empty } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const EmptyBox: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span style={{ color: "#ffffff" }}>{t("noData")}</span>}
    />
  );
};
