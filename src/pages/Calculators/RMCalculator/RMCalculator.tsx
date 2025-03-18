import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SyncOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { SubTitle } from "components/SubTitle/SubTitle";
import { ResetButton } from "components/ResetButton/ResetButton";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import { RMMain } from "./RMMain/RMMain";
import styles from "./RMCalculator.module.scss";

export const RMCalculator: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<number>(2);
  const [result, setResult] = useState<number>(0);

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
      <h3 className={styles.info}>{t("indicateWeightAndReps")}</h3>
      <div>
        <RMMain
          reps={reps}
          setReps={setReps}
          setResult={setResult}
          weight={weight}
          setWeight={setWeight}
        />
        <div className={styles.result}>
          <h4> {t("calcResult")}</h4>
          <div className={styles.resultWeight}>
            {result === 0 && (
              <p>
                {result} {t("kg")}
              </p>
            )}
            {result > 0 && (
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
              >
                <p>
                  {result} {t("kg")}
                </p>
              </motion.div>
            )}
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
});
