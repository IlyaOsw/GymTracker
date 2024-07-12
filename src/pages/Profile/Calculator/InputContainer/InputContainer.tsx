import { Input, message } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MinusOutlined,
  PlusOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import { InputContainerPropsType } from "../../../../types/types";

import styles from "./InputContainer.module.scss";

export const InputContainer: React.FC<InputContainerPropsType> = ({
  inputValue,
  reps,
  setReps,
  setResult,
  setInputValue,
}) => {
  const { t } = useTranslation();
  const [weight, setWeight] = useState<number>(0);

  const increment = () => {
    if (reps < 15) {
      setReps(reps + 1);
    }
  };

  const decrement = () => {
    if (reps > 1) {
      setReps(reps - 1);
    }
  };

  const calculate1RM = () => {
    if (!inputValue.trim()) {
      message.error(t("enterWorkingWeight"));
    }
    const M = weight;
    const k = reps;

    const oneRM_Epley = (M * k) / 30 + M;
    const oneRM_Brzycki = M * (36 / (37 - k));
    const average = ((Number(oneRM_Epley) + Number(oneRM_Brzycki)) / 2).toFixed(
      1
    );
    setResult(Number(average));
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (/^\d*\.?\d?$/.test(value)) {
      setInputValue(value);
      setWeight(value === "" ? 0 : parseFloat(value));
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.block}>
        <div className={styles.subtitle}>{t("workingWeight")}</div>
        <Input
          className={styles.weight}
          allowClear
          placeholder={t("weightKg")}
          value={inputValue}
          type="number"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.block}>
        <div className={styles.subtitle}>{t("repsNumber")}</div>
        <div className={styles.reps}>
          <button className={styles.plusMinus} onClick={decrement}>
            <MinusOutlined />
          </button>
          <div className={styles.repsNumber}>{reps}</div>
          <button className={styles.plusMinus} onClick={increment}>
            <PlusOutlined />
          </button>
        </div>
      </div>
      <CustomButton
        children={t("calculate")}
        className={styles.calculate}
        onClick={calculate1RM}
        icon={<RightCircleOutlined />}
      />
    </div>
  );
};
