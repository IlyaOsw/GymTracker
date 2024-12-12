import React, { useEffect, useState } from "react";
import { ConfigProvider, Progress } from "antd";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import {
  DeleteOutlined,
  FormOutlined,
  RiseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { IGoalData } from "../../../types/types";
import { CustomModal } from "../../../components/CustomModal/CustomModal";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { Calendar } from "../../../components/Calendar/Calendar";
import NumericInput from "../../../components/NumericInput/NumericInput";
import { ResetButton } from "../../../components/ResetButton/ResetButton";
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal/ConfirmDeleteModal";

import styles from "./Goal.module.scss";

export const Goal: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const user = getAuth().currentUser;
  const [goalData, setGoalData] = useState<IGoalData>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [stepsCount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [goal, setGoal] = useState<string>();
  const [currentValue, setCurrentValue] = useState<string>();
  const [startWeight, setStartWeight] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [goalWeight, setGoalWeight] = useState<string | undefined>();
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
  }, [user]);

  const handleSetGoal = async () => {
    try {
      const newGoalData: IGoalData = {
        id: uuidv4(),
        goal: t("Describe your goal"),
        startWeight: "0",
        startDate: "00.00.00",
        goalWeight: "0",
        endDate: "00.00.00",
        currentValue: "0",
      };

      const goalRef = doc(collection(getFirestore(), "goals"), user?.uid);
      await setDoc(goalRef, newGoalData);

      setGoalData(newGoalData);
    } catch (error) {
      console.error(error);
    }
  };

  const progress = goalData
    ? Math.min(
        ((Number(goalData.currentValue) - Number(goalData.startWeight)) /
          (Number(goalData.goalWeight) - Number(goalData.startWeight))) *
          100,
        100
      ).toFixed(1)
    : "0.0";

  const handleEditMode = () => {
    if (goalData) {
      setGoal(goalData.goal);
      setCurrentValue(goalData.currentValue);
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
        startWeight: startWeight || "0",
        startDate: startDate || "",
        goalWeight: goalWeight || "0",
        endDate: endDate || "",
        currentValue: currentValue || "0",
      };

      if (!user?.uid) {
        return;
      }

      const goalRef = doc(getFirestore(), "goals", user.uid);
      await setDoc(goalRef, updatedGoalData);

      setGoalData(updatedGoalData);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGoal = async () => {
    if (!user) {
      console.error("No user is logged in");
      return;
    }

    const goalRef = doc(getFirestore(), "goals", user.uid);

    try {
      await deleteDoc(goalRef);
      setIsModalOpen(false);
      setGoalData(undefined);
    } catch (error) {
      console.error(error);
    }
  };
  const parseDate = (dateString: string): Date | undefined => {
    const [day, month, year] = dateString.split(".").map(Number);
    if (!day || !month || !year) return undefined;
    return new Date(year, month - 1, day);
  };

  const handleCloseModal = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <SubTitle>{t("goalTracker")}</SubTitle>
        {goalData ? (
          <>
            <div>{t(goalData?.goal)}</div>
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
                      percent={Number(progress)}
                      trailColor="lightgray"
                      strokeWidth={14}
                    />
                  </ConfigProvider>
                </Flex>
                <div className={styles.progressText}>
                  {t("current")}
                  <p className={styles.progressValue}>
                    {goalData?.currentValue} {t("kg")}
                  </p>
                </div>
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
            <div className={styles.trackerBtns}>
              <ResetButton
                icon={<DeleteOutlined />}
                onClick={() => setIsModalOpen(true)}
              >
                {t("delete")}
              </ResetButton>
              <CustomButton icon={<FormOutlined />} onClick={handleEditMode}>
                {t("edit")}
              </CustomButton>
            </div>
            {isModalOpen && (
              <ConfirmDeleteModal
                isModalOpen={isModalOpen}
                text={t("confrimDeleteGoal")}
                onClick={handleDeleteGoal}
                handleCancel={handleCloseModal}
              />
            )}
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
            <CustomInput
              text={t("goalTitle")}
              placeholder={t("Describe your goal")}
              value={goal}
              onChange={(value) => setGoal(value)}
            />
            <div className={styles.numericInputBlock}>
              {t("current")}
              <NumericInput
                value={currentValue}
                onChange={(value) => setCurrentValue(value)}
                className={styles.numericInput}
                placeholder={t("currentPh")}
              />
            </div>
            <div className={styles.numericInputBlock}>
              {t("startWeight")}
              <NumericInput
                value={startWeight}
                onChange={(value) => setStartWeight(value)}
                className={styles.numericInput}
                placeholder={t("startWeightPh")}
              />
            </div>
            <div className={styles.startBlock}>
              <span className={styles.inputLabel}>{t("startDate")}</span>
              <Calendar
                value={startDate ? parseDate(startDate) : undefined}
                onChange={(value: Date) => {
                  setStartDate(
                    value.toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  );
                }}
              />
            </div>
            <div className={styles.numericInputBlock}>
              {t("goalWeight")}
              <NumericInput
                value={goalWeight}
                onChange={(value) => setGoalWeight(value)}
                className={styles.numericInput}
                placeholder={t("goalWeightPh")}
              />
            </div>
            <div>
              <span className={styles.inputLabel}>{t("endDate")}</span>
              <Calendar
                value={endDate ? parseDate(endDate) : undefined}
                onChange={(value: Date) => {
                  setEndDate(
                    value.toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  );
                }}
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
