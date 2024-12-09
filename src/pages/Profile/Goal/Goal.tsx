import React, { useEffect, useState } from "react";
import { ConfigProvider, Progress } from "antd";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FormOutlined, RiseOutlined } from "@ant-design/icons";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { IGoalData } from "../../../types/types";

import styles from "./Goal.module.scss";

export const Goal: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const user = getAuth().currentUser;
  const { ref, controls } = useAnimatedInView();
  const [goalData, setGoalData] = useState<IGoalData>();

  const [stepsCount] = useState(8);

  useEffect(() => {
    const fetchGoal = async () => {
      if (!user) {
        console.error("No user is logged in");

        return;
      }
      const userGoalRef = doc(getFirestore(), "goals", user.uid);

      try {
        const docSnapshot = await getDoc(userGoalRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as IGoalData;
          setGoalData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoal();
  }, []);

  const handleSetGoal = async () => {
    try {
      const goalData: IGoalData = {
        id: uuidv4(),
        goal: t("Describe your goal"),
        startWeight: 0,
        startDate: "00.00.00",
        goalWeight: 0,
        endDate: "00.00.00",
        currentValue: 0,
      };

      const goalRef = doc(collection(getFirestore(), "goals"), user?.uid);
      await setDoc(goalRef, goalData);

      console.log("Goal successfully created:", goalData);
    } catch (error) {
      console.error(error);
    }
  };

  const progress = goalData
    ? Math.min(
        ((goalData.currentValue - goalData.startWeight) /
          (goalData.goalWeight - goalData.startWeight)) *
          100,
        100
      )
    : 0;

  return (
    <>
      <div className={styles.container}>
        <SubTitle>{t("goalTracker")}</SubTitle>
        {goalData ? (
          <>
            <motion.div
              ref={ref}
              className={styles.info}
              initial="hidden"
              animate={controls}
              variants={animation}
            >
              {t(goalData?.goal)}
            </motion.div>
            <div className={styles.details}>
              <div className={styles.weightInfo}>
                <div className={styles.infoBox}>
                  <span className={styles.label}>{t("startWeight")}</span>
                  <span className={styles.value}>
                    {goalData?.startWeight} {t("kg")}
                  </span>
                </div>
                <div className={styles.infoBox}>
                  <span className={styles.label}>{t("startDate")}</span>
                  <span className={styles.value}>{goalData?.startDate}</span>
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
                <p className={styles.progressText}>
                  {t("current")} {goalData?.currentValue} {t("kg")}
                </p>
              </div>
              <div className={styles.dateInfo}>
                <div className={styles.infoBox}>
                  <span className={styles.label}>{t("goalWeight")}</span>
                  <span className={styles.value}>
                    {goalData?.goalWeight} {t("kg")}
                  </span>
                </div>
                <div className={styles.infoBox}>
                  <span className={styles.label}>{t("endDate")}</span>
                  <span className={styles.value}>{goalData?.endDate}</span>
                </div>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <CustomButton icon={<FormOutlined />}>{t("edit")}</CustomButton>
            </div>
          </>
        ) : (
          <>
            <p className={styles.info}> {t("trackProgress")}</p>
            <div className={styles.actionButtons}>
              <CustomButton icon={<RiseOutlined />} onClick={handleSetGoal}>
                {t("setGoal")}
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </>
  );
});
