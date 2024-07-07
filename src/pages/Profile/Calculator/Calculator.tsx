import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MinusOutlined,
  PlusOutlined,
  RightCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import { motion } from "framer-motion";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { ResetButton } from "../../../components/ResetButton/ResetButton";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import styles from "./Calculator.module.scss";

export const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [weight, setWeight] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const [reps, setReps] = useState<number>(1);
  const [result, setResult] = useState<number>(0);

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

  const handleReset = () => {
    setInputValue("");
    setReps(1);
    setResult(0);
    message.success(t("reseted"));
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (/^\d*\.?\d?$/.test(value)) {
      setInputValue(value);
      setWeight(value === "" ? 0 : parseFloat(value));
    }
  };

  return (
    <>
      <SubTitle children={t("weightCalculator")} className={styles.header} />
      <motion.div
        ref={ref}
        className={styles.info}
        initial="hidden"
        animate={controls}
        variants={animation}
      >
        {t("indicateWeightAndReps")}
      </motion.div>
      <div className={styles.container}>
        <div className={styles.calculator}>
          <div className={styles.block}>
            <div className={styles.subtitle}>{t("workingWeight")}</div>
            <Input
              className={styles.weight}
              allowClear
              placeholder={t("weightKg")}
              value={inputValue}
              type="tel"
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
        <div className={styles.result}>{t("calcResult")}</div>
        <div className={styles.resultWeight}>
          {result} {t("kg")}
        </div>
        <ResetButton
          children={t("reset")}
          onClick={handleReset}
          icon={<SyncOutlined />}
        />
      </div>
    </>
  );
};
