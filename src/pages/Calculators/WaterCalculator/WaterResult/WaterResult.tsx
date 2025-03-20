import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { WaterResultPropsType } from "types/water-result";

import styles from "../WaterCalculator.module.scss";

export const WaterResult: React.FC<WaterResultPropsType> = ({ result }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.result}>
      <h4>{t("waterCalcResult")}</h4>
      <h4 className={styles.resultCount}>
        {result === 0 && (
          <p>
            {result} {t("l")}
          </p>
        )}
        {result > 0 && (
          <motion.div
            key={result}
            className={styles.activityInfo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <p className={styles.resultValue}>
              {result} {t("l")}
            </p>
          </motion.div>
        )}
      </h4>
    </div>
  );
};
