import { ConfigProvider, Form, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { FieldType, SportSelectPropsType } from "../../types/types";

import styles from "./SportSelect.module.scss";

export const SportSelect: React.FC<SportSelectPropsType> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.selectWrapper}>
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
              { value: "", label: "Not Selected" },
              { value: "Fitness", label: "Fitness" },
              { value: "Bodybuilding", label: "Bodybuilding" },
              { value: "Powerbuilding", label: "Powerbuilding" },
              { value: "Powerlifting", label: "Powerlifting" },
              { value: "Crossfit", label: "Crossfit" },
              { value: "Functional training", label: "Functional training" },
              { value: "Weightlifting", label: "Weightlifting" },
            ]}
          />
        </ConfigProvider>
      </Form.Item>
    </div>
  );
};
