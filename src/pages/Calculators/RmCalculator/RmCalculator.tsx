import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SyncOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { SubTitle } from "components/SubTitle/SubTitle";
import { ResetButton } from "components/ResetButton/ResetButton";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import { InputContainer } from "./InputContainer/InputContainer";
import styles from "./RmCalculator.module.scss";

export const RmCalculator: React.FC = React.memo(() => {
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
    <motion.div
      className={styles.container}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
    >
      <SubTitle children={t("weightCalculator")} className={styles.header} />
      <div className={styles.info}>{t("indicateWeightAndReps")}</div>
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
          className={styles.resetBtn}
          children={t("reset")}
          onClick={handleReset}
          icon={<SyncOutlined />}
        />
      </div>
    </motion.div>
  );
});
