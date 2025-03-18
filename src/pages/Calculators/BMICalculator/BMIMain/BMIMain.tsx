import { DoubleRightOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { CustomButton } from "components/CustomButton/CustomButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { BMIMainPropsType } from "types/bmi-main";

import styles from "./BMIMain.module.scss";

export const BMIMain: React.FC<BMIMainPropsType> = ({
  weight,
  height,
  setWeight,
  setHeight,
  setResult,
}) => {
  const { t } = useTranslation();

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", ".");
    if (!isNaN(parseFloat(value)) && /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    } else {
      setWeight("");
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(",", ".");
    if (!isNaN(parseFloat(value)) && /^\d*\.?\d*$/.test(value)) {
      setHeight(value);
    } else {
      setHeight("");
    }
  };

  const calculateBMI = () => {
    if (!weight || !height || Number(weight) === 0 || Number(height) === 0) {
      ClosableMessage({
        type: "warning",
        content: t("enterValidWeightHeight"),
      });
      return;
    }
    const heightInMeters = Number(height) / 100;
    const bmi = Number(weight) / (heightInMeters * heightInMeters);
    setResult(Number(bmi.toFixed(2)));
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.block}>
        <div className={styles.subtitle}>{t("userWeight")}</div>
        <Input
          className={styles.input}
          allowClear
          placeholder={t("weightKg")}
          value={weight}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          onChange={handleWeightChange}
        />
      </div>
      <div className={styles.block}>
        <h4 className={styles.subtitle}>{t("userHeight")}</h4>
        <Input
          className={styles.input}
          allowClear
          placeholder={t("heightPlaceholder")}
          value={height}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          onChange={handleHeightChange}
        />
      </div>
      <CustomButton
        children={t("calculate")}
        className={styles.calculate}
        onClick={calculateBMI}
        icon={<DoubleRightOutlined />}
      />
    </div>
  );
};
