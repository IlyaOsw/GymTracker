import React, { useState } from "react";
import { ConfigProvider, Progress } from "antd";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FormOutlined } from "@ant-design/icons";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";
import { CustomButton } from "../../../components/CustomButton/CustomButton";

import styles from "./Goal.module.scss";

export const Goal: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  const startWeight = 420;
  const goalWeight = 430;
  const [currentWeight] = useState(startWeight);
  const [stepsCount] = useState(8);

  const progress = Math.min(
    ((currentWeight - startWeight) / (goalWeight - startWeight)) * 100,
    100
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SubTitle>{t("goalTracker")}</SubTitle>
        <motion.div
          ref={ref}
          className={styles.info}
          initial="hidden"
          animate={controls}
          variants={animation}
        >
          {t("trackProgress")}
        </motion.div>
      </div>

      <div className={styles.details}>
        <div className={styles.weightInfo}>
          <div className={styles.infoBox}>
            <span className={styles.label}>{t("startWeight")}</span>
            <span className={styles.value}>
              {startWeight} {t("kg")}
            </span>
          </div>
          <div className={styles.infoBox}>
            <span className={styles.label}>{t("startDate")}</span>
            <span className={styles.value}>1.12.2024</span>
          </div>
        </div>

        <div className={styles.progressBar}>
          <Flex wrap gap="middle">
            <ConfigProvider
              theme={{
                components: {
                  Progress: {
                    defaultColor: "#0097b2",
                  },
                },
              }}
            >
              <Progress
                type="dashboard"
                steps={stepsCount}
                percent={progress}
                trailColor="lightgray"
                strokeWidth={15}
              />
            </ConfigProvider>
          </Flex>
          {/* <p className={styles.progressText}>
            {t("progress")} {progress.toFixed(0)}%
          </p> */}
          <p className={styles.progressText}>
            {t("current")} {currentWeight} {t("kg")}
          </p>
        </div>

        <div className={styles.dateInfo}>
          <div className={styles.infoBox}>
            <span className={styles.label}>{t("goalWeight")}</span>
            <span className={styles.value}>
              {goalWeight} {t("kg")}
            </span>
          </div>
          <div className={styles.infoBox}>
            <span className={styles.label}>{t("endDate")}</span>
            <span className={styles.value}>1.01.2025</span>
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <CustomButton icon={<FormOutlined />}>{t("Edit Goal")}</CustomButton>
      </div>
    </div>
  );
});
