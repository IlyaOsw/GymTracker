import React, { useState } from "react";
import { Input } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { DoubleRightOutlined, SyncOutlined } from "@ant-design/icons";

import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { SubTitle } from "components/SubTitle/SubTitle";
import { CustomButton } from "components/CustomButton/CustomButton";
import { ResetButton } from "components/ResetButton/ResetButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./BMICalculator.module.scss";

export const BMICalculator: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number>(0);

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

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setResult(0);
    ClosableMessage({ type: "success", content: t("reseted") });
  };

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

  return (
    <motion.div
      className={styles.container}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
    >
      <SubTitle children={t("weightCalculator")} className={styles.header} />
      <h3 className={styles.info}>{t("indicateWeightAndReps")}</h3>
      <div>
        <div className={styles.calculator}>
          <div className={styles.block}>
            <div className={styles.subtitle}>{t("workingWeight")}</div>
            <Input
              className={styles.weight}
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
            <h4 className={styles.subtitle}>{t("repsNumber")}</h4>
            <Input
              className={styles.weight}
              allowClear
              placeholder={t("weightKg")}
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
        <div className={styles.result}>
          {t("calcResult")}
          <div className={styles.resultWeight}>
            {result} {t("kg")}
          </div>
        </div>
        <ResetButton
          className={styles.resetBtn}
          children={t("reset")}
          onClick={handleReset}
          icon={<SyncOutlined />}
        />
      </div>
    </motion.div>
  );
};
