import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { ResetButton } from "../../../components/ResetButton/ResetButton";

import styles from "./Calculator.module.scss";

export const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const [weight, setWeight] = useState<number>(0);
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
  };

  return (
    <>
      <SubTitle children={t("weightCalculator")} className={styles.header} />
      <div className={styles.info}>{t("indicateWeightAndReps")}</div>
      <div className={styles.container}>
        <div className={styles.calculator}>
          <div>
            <div className={styles.subtitle}>{t("workingWeight")}</div>
            <Input
              className={styles.weight}
              allowClear
              placeholder={t("weightKg")}
              value={weight === 0 ? "" : weight.toString()}
              onChange={(e) => {
                const inputWeight = e.target.value;
                if (/^\d*$/.test(inputWeight)) {
                  setWeight(inputWeight === "" ? 0 : Number(inputWeight));
                }
              }}
            />
          </div>
          <div>
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
          />
        </div>
        <div className={styles.result}>{t("calcResult")}</div>
        <div className={styles.resultWeight}>
          {result} {t("kg")}
        </div>
        <ResetButton children={t("reset")} onClick={handleReset} />
      </div>
    </>
  );
};
