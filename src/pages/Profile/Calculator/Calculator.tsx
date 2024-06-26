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
  const [reps, setReps] = useState<number>(1);
  const [result, setResult] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();

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
    setWeight(0);
    setReps(1);
    setResult(0);
    message.success(t("reseted"));
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
              value={weight === 0 ? "" : weight.toString()}
              type="tel"
              onChange={(e) => {
                const inputWeight = e.target.value;
                if (/^\d*$/.test(inputWeight)) {
                  setWeight(inputWeight === "" ? 0 : Number(inputWeight));
                }
              }}
            />
          </div>
          <div className={styles.block}>
            <div className={styles.subtitle}>{t("repsNumber")}</div>
            <div className={styles.reps}>
              <button className={styles.minus} onClick={decrement}>
                <MinusOutlined />
              </button>
              <div className={styles.repsNumber}>{reps}</div>
              <button className={styles.plus} onClick={increment}>
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
        {contextHolder}
        <ResetButton
          children={t("reset")}
          onClick={handleReset}
          icon={<SyncOutlined />}
        />
      </div>
    </>
  );
};
