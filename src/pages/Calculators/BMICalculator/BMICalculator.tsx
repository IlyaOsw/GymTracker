import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SyncOutlined } from "@ant-design/icons";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { SubTitle } from "components/SubTitle/SubTitle";
import { ResetButton } from "components/ResetButton/ResetButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import { BMIMain } from "./BMIMain/BMIMain";
import { BMIResult } from "./BMIResult/BMIResult";
import { BMICollapse } from "./BMICollapse/BMICollapse";
import styles from "./BMICalculator.module.scss";

export const BMICalculator: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<number>(0);

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setResult(0);
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
      <SubTitle children={t("BMICalcualtor")} className={styles.header} />
      <h3 className={styles.info}>{t("BMICalcSubTitle")}</h3>
      <BMIMain
        weight={weight}
        height={height}
        setWeight={setWeight}
        setHeight={setHeight}
        setResult={setResult}
      />
      <BMIResult result={result} />
      <BMICollapse />
      <ResetButton
        className={styles.resetBtn}
        children={t("reset")}
        onClick={handleReset}
        icon={<SyncOutlined />}
      />
    </motion.div>
  );
};
