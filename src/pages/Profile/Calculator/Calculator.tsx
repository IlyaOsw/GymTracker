import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SyncOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { ResetButton } from "../../../components/ResetButton/ResetButton";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";
import { ClosableMessage } from "../../../components/ClosableMessage/ClosableMessage";

import { InputContainer } from "./InputContainer/InputContainer";
import styles from "./Calculator.module.scss";

export const Calculator: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [reps, setReps] = useState<number>(2);
  const [result, setResult] = useState<number>(0);
  const [weight, setWeight] = useState<string>("");

  const handleReset = () => {
    setReps(2);
    setResult(0);
    setWeight("");
    ClosableMessage({ type: "success", content: t("reseted") });
  };

  return (
    <div className={styles.container}>
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
      <div>
        <InputContainer
          reps={reps}
          setReps={setReps}
          setResult={setResult}
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
    </div>
  );
});
