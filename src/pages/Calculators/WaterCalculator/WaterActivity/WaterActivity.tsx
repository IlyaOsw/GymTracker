import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { WaterActivityPropsType } from "types/calculators/water-activity";

import styles from "../WaterCalculator.module.scss";

export const WaterActivity: React.FC<WaterActivityPropsType> = ({
  activity,
  setActivity,
}) => {
  const { t } = useTranslation();

  const activityTexts: { [key: string]: string } = {
    low: t("lowActivity"),
    medium: t("mediumActivity"),
    high: t("highActivity"),
  };

  return (
    <div className={styles.activityBlock}>
      <h4 className={styles.subtitle}>{t("activity")}</h4>
      <div className={styles.select}>
        <div
          className={`${styles.option} ${
            activity === "low" ? styles.active : ""
          }`}
          onClick={() => setActivity("low")}
        >
          {t("low")}
        </div>
        <div
          className={`${styles.option} ${
            activity === "medium" ? styles.active : ""
          }`}
          onClick={() => setActivity("medium")}
        >
          {t("medium")}
        </div>
        <div
          className={`${styles.option} ${
            activity === "high" ? styles.active : ""
          }`}
          onClick={() => setActivity("high")}
        >
          {t("high")}
        </div>
      </div>
      <div>
        <AnimatePresence mode="wait">
          {activity && (
            <motion.p
              key={activity}
              className={styles.activityInfo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              {activityTexts[activity]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
