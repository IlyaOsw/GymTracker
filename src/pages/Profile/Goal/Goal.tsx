import React, { useEffect, useState } from "react";
import { ConfigProvider, Divider, Progress } from "antd";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FormOutlined, RiseOutlined, SyncOutlined } from "@ant-design/icons";
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
import { CustomModal } from "../../../components/CustomModal/CustomModal";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { Calendar } from "../../../components/Calendar/Calendar";

import styles from "./Goal.module.scss";

export const Goal: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const user = getAuth().currentUser;
  const { ref, controls } = useAnimatedInView();
  const [goalData, setGoalData] = useState<IGoalData>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [stepsCount] = useState(8);

  const [goal, setGoal] = useState<string>();
  const [startWeight, setStartWeight] = useState<number | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [goalWeight, setGoalWeight] = useState<number | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

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
      const newGoalData: IGoalData = {
        id: uuidv4(),
        goal: t("Describe your goal"),
        startWeight: 0,
        startDate: "00.00.00",
        goalWeight: 0,
        endDate: "00.00.00",
        currentValue: 0,
      };

      const goalRef = doc(collection(getFirestore(), "goals"), user?.uid);
      await setDoc(goalRef, newGoalData);

      console.log("Goal successfully created:", newGoalData);

      setGoalData(newGoalData);
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

  const handleEditMode = () => {
    if (goalData) {
      setStartWeight(goalData.startWeight);
      setStartDate(goalData.startDate);
      setGoalWeight(goalData.goalWeight);
      setEndDate(goalData.endDate);
    }
    setEditMode(true);
  };

  const handleCancel = () => setEditMode(false);
  const handleSave = async () => {
    try {
      const updatedGoalData: IGoalData = {
        ...goalData,
        id: goalData?.id || uuidv4(),
        goal: goal || "",
        startWeight: startWeight || 0,
        startDate: startDate || "",
        goalWeight: goalWeight || 0,
        endDate: endDate || "",
        currentValue: 0,
      };

      if (!user?.uid) {
        console.error("User is not logged in");
        return;
      }

      const goalRef = doc(getFirestore(), "goals", user.uid);
      await setDoc(goalRef, updatedGoalData);

      setGoalData(updatedGoalData);
      setEditMode(false);
      console.log(updatedGoalData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <SubTitle>{t("goalTracker")}</SubTitle>
        {goalData ? (
          <>
            <div className={styles.info}>{t(goalData?.goal)}</div>
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
              <CustomButton icon={<FormOutlined />} onClick={handleEditMode}>
                {t("edit")}
              </CustomButton>
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
      {editMode && (
        <CustomModal open={editMode} footer={null} onCancel={handleCancel}>
          <div className={styles.editTitle}>{t("setGoalDescription")}</div>

          <div className={styles.modal}>
            <div className={styles.goaltitle}>
              <CustomInput
                text={t("goalTitle")}
                placeholder={t("Describe your goal")}
                value={goal}
                onChange={(value) => setGoal(value)}
              />
            </div>

            <CustomInput
              text={t("startWeight")}
              placeholder={t("startWeightPh")}
              value={startWeight}
              onChange={(value) => setStartWeight(value)}
            />
            <div className={styles.startBlock}>
              <span className={styles.inputLabel}>{t("startDate")}</span>
              <Calendar
                value={new Date(startDate || "")}
                onChange={(value: Date) =>
                  setStartDate(value.toISOString().split("T")[0])
                }
              />
            </div>
            <CustomInput<number>
              text={t("goalWeight")}
              placeholder={t("goalWeightPh")}
              value={goalWeight}
              onChange={(value) => setGoalWeight(value)}
            />
            <div>
              <span className={styles.inputLabel}>{t("endDate")}</span>
              <Calendar
                value={new Date(endDate || "")}
                onChange={(value: Date) =>
                  setEndDate(value.toISOString().split("T")[0])
                }
              />
            </div>
            <CustomButton
              onClick={handleSave}
              icon={<SyncOutlined />}
              className={styles.updateBtn}
            >
              {t("update")}
            </CustomButton>
          </div>
        </CustomModal>
      )}
    </>
  );
});
