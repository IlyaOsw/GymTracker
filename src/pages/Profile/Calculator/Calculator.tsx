import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";

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
    <div className={styles.calcWrapper}>
      <SubTitle children={t("weightCalculator")} />
      <div className={styles.info}>{t("indicateWeightAndReps")}</div>
      <div className={styles.container}>
        <div className={styles.calculator}>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  activeShadow: "0px 0px 10px #0097b2",
                  colorTextPlaceholder: "#818181",
                },
              },
            }}
          >
            <Input
              className={styles.weight}
              allowClear
              placeholder={t("workingWeight")}
              value={weight === 0 ? "" : weight.toString()}
              onChange={(e) => {
                const inputWeight = e.target.value;
                if (/^\d*$/.test(inputWeight)) {
                  setWeight(inputWeight === "" ? 0 : Number(inputWeight));
                }
              }}
            />
          </ConfigProvider>
          <div className={styles.reps}>
            <button className={styles.minus} onClick={decrement}>
              <MinusOutlined />
            </button>
            <div className={styles.repsNumber}>{reps}</div>
            <button className={styles.plus} onClick={increment}>
              <PlusOutlined />
            </button>
          </div>
          <CustomButton
            children={t("calculate")}
            className={styles.calculate}
            onClick={calculate1RM}
          />
        </div>
        <div className={styles.result}>
          {t("calcResult")}
          {result} {t("kg")}
        </div>
        <ResetButton children={t("reset")} onClick={handleReset} />
      </div>
    </div>
  );
};
