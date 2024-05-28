import React from "react";
import { Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";

export const Loader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Flex
      align="center"
      justify="center"
      gap="middle"
      style={{ height: "100vh", flexDirection: "column" }}
    >
      <Spin size="large" />
      <p>{t("loading")} </p>
    </Flex>
  );
};
