import { ConfigProvider, Form, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { FieldType, SportSelectPropsType } from "../../types/types";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./SportSelect.module.scss";

export const SportSelect: React.FC<SportSelectPropsType> = ({
  value,
  onChange,
}) => {
  const { ref, controls } = useAnimatedInView();
  const { t } = useTranslation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      className={styles.selectWrapper}
    >
      <Form.Item<FieldType>
        label={<span className={styles.selectLabel}>{t("sport")}</span>}
      >
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBgContainer: "#141414",
                colorBgElevated: "#141414",
                colorBorder: "#0097b2",
                colorText: "#ffffff",
                colorTextPlaceholder: "#818181",
                optionSelectedBg: "#404040",
                optionActiveBg: "#404040",
              },
            },
          }}
        >
          <Select
            className={styles.selectField}
            value={value}
            onChange={onChange}
            style={{ width: 275 }}
            allowClear
            variant="borderless"
            options={[
              { value: "", label: t("NotSelected") },
              { value: t("Fitness"), label: t("Fitness") },
              { value: t("Bodybuilding"), label: t("Bodybuilding") },
              { value: t("Powerbuilding"), label: t("Powerbuilding") },
              { value: t("Powerlifting"), label: t("Powerlifting") },
              { value: t("Crossfit"), label: t("Crossfit") },
              { value: t("FTraining"), label: t("FTraining") },
              { value: t("Weightlifting"), label: t("Weightlifting") },
            ]}
          />
        </ConfigProvider>
      </Form.Item>
    </motion.div>
  );
};
