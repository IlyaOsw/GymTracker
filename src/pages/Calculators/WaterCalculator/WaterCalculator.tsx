import React, { useState } from "react";
import { Input } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { SubTitle } from "components/SubTitle/SubTitle";
import { CustomButton } from "components/CustomButton/CustomButton";
import { DoubleRightOutlined, SyncOutlined } from "@ant-design/icons";
import { ResetButton } from "components/ResetButton/ResetButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import { WaterActivity } from "./WaterActivity/WaterActivity";
import { WaterGender } from "./WaterGender/WaterGender";
import { WaterResult } from "./WaterResult/WaterResult";
import styles from "./WaterCalculator.module.scss";

const waterIntakeRates: {
  [gender: string]: { [activity: string]: number };
} = {
  male: {
    low: 35,
    medium: 40,
    high: 45,
  },
  female: {
    low: 30,
    medium: 35,
    high: 40,
  },
};

export const WaterCalculator: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [result, setResult] = useState<number>(0);
  const [activity, setActivity] = useState<"low" | "medium" | "high">("medium");

  const calculateWater = (): void => {
    if (!weight || Number(weight) === 0) {
      ClosableMessage({ type: "warning", content: t("enterValidWeight") });
      return;
    }
    const mlPerKg = waterIntakeRates[gender][activity];
    const totalMl = mlPerKg * Number(weight);
    const liters = totalMl / 1000;
    setResult(Number(liters.toFixed(2)));
  };

  const handleReset = () => {
    setWeight("");
    setActivity("medium");
    setGender("male");
    setResult(0);
    ClosableMessage({ type: "success", content: t("reseted") });
  };

  const handleChange = (e: { target: { value: string } }) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    const numericValue = parseFloat(value);

    if (numericValue > 1000) {
      ClosableMessage({
        type: "warning",
        content: t("noMoreThan1000kg"),
      });
    } else if (!isNaN(numericValue) && /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    } else {
      setWeight("");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      className={styles.container}
    >
      <SubTitle children={t("waterCalcTitle")} className={styles.header} />
      <h3 className={styles.info}>{t("waterCalcSubTitle")}</h3>
      <div className={styles.form}>
        <div>
          <h4 className={styles.subtitle}>{t("yourWeight")}</h4>
          <Input
            className={styles.input}
            allowClear
            placeholder={t("weightKg")}
            value={weight}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.,]?[0-9]*"
            onChange={handleChange}
          />
        </div>
        <WaterActivity activity={activity} setActivity={setActivity} />
        <WaterGender gender={gender} setGender={setGender} />
      </div>
      <CustomButton
        children={t("calculate")}
        className={styles.calculate}
        icon={<DoubleRightOutlined />}
        onClick={calculateWater}
      />
      <WaterResult result={result} />
      <ResetButton
        className={styles.resetBtn}
        children={t("reset")}
        onClick={handleReset}
        icon={<SyncOutlined />}
      />
    </motion.div>
  );
};
