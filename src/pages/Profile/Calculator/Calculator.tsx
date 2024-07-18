import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SyncOutlined } from "@ant-design/icons";
import { message } from "antd";
import { motion } from "framer-motion";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { ResetButton } from "../../../components/ResetButton/ResetButton";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import { InputContainer } from "./InputContainer/InputContainer";

import styles from "./Calculator.module.scss";

export const Calculator: React.FC = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const { ref, controls } = useAnimatedInView();
  const [inputValue, setInputValue] = useState<string>("");
  const [reps, setReps] = useState<number>(1);
  const [result, setResult] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleReset = () => {
    setInputValue("");
    setReps(1);
    setResult(0);
    setWeight(0);
    messageApi.open({
      type: "success",
      content: t("reseted"),
    });
  };

  return (
    <>
      {contextHolder}
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
        <InputContainer
          inputValue={inputValue}
          reps={reps}
          setReps={setReps}
          setResult={setResult}
          setInputValue={setInputValue}
          weight={weight}
          setWeight={setWeight}
        />
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
