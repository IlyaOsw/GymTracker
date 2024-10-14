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
  weight,
  setWeight,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const increment = () => {
    if (reps < 10) setReps(reps + 1);
  };

  const decrement = () => {
    if (reps > 2) setReps(reps - 1);
  };

  const calculate1RM = () => {
    if (!inputValue.trim()) {
      messageApi.open({
        type: "error",
        content: t("enterWorkingWeight"),
      });
    }
    const oneRM_Epley = (weight * reps) / 30 + weight;
    const oneRM_Brzycki = weight * (36 / (37 - reps));
    const average = ((Number(oneRM_Epley) + Number(oneRM_Brzycki)) / 2).toFixed(
      1
    );
    setResult(Number(average));
  };

  const handleChange = (e: { target: { value: string } }) => {
    let value = e.target.value;
    value = value.replace(",", ".");

    if (/^\d*\.?\d?$/.test(value)) {
      setInputValue(value);
      setWeight(value === "" ? 0 : parseFloat(value));
    }
  };

  return (
    <div className={styles.calculator}>
      {contextHolder}
      <div className={styles.block}>
        <div className={styles.subtitle}>{t("workingWeight")}</div>
        <Input
          className={styles.weight}
          allowClear
          placeholder={t("weightKg")}
          value={inputValue}
          type="text"
          inputMode="decimal"
          pattern="[0-9]*[.,]?[0-9]*"
          onChange={handleChange}
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
      <div className={styles.calculateWrapper}>
        <CustomButton
          children={t("calculate")}
          className={styles.calculate}
          onClick={calculate1RM}
          icon={<RightCircleOutlined />}
        />
      </div>
    </div>
  );
};
