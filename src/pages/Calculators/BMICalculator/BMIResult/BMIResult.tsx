import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { BMIResultPropsType } from "types/calculators/bmi-result";
import { getBMIDescription } from "utils/bmiDescription";

import styles from "./BMIResult.module.scss";

export const BMIResult: React.FC<BMIResultPropsType> = ({ result }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.result}>
      <h4>{t("BMIResult")}</h4>
      <div className={styles.BMIResult}>
        {result === 0 && <p>{result}</p>}
        {result > 0 && (
          <motion.div
            key={result}
            className={styles.activityInfo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles.resultValue}>{result}</p>
            <p className={styles.resultDescription}>
              {getBMIDescription(result, t)}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
