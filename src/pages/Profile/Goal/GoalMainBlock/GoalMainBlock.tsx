import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import { ResetButton } from "../../../../components/ResetButton/ResetButton";
import { GoalMainBlockPropsType } from "../../../../types/goal-main-block";
import { calculateProgress } from "../../../../utils/calculateProgress";

import styles from "./GoalMainBlock.module.scss";

export const GoalMainBlock: React.FC<GoalMainBlockPropsType> = React.memo(
  ({
    goalData,
    setGoalData,
    setGoal,
    setCurrentValue,
    setStartWeight,
    setStartDate,
    setGoalWeight,
    setEndDate,
    setEditMode,
  }) => {
    const { t } = useTranslation();
    const user = getAuth().currentUser;
    const [stepsCount] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleDeleteGoal = async () => {
      if (!user) return;
      const goalRef = doc(getFirestore(), "goals", user.uid);

      try {
        await deleteDoc(goalRef);
        setIsModalOpen(false);
        setGoalData(undefined);
      } catch (error) {
        console.error(error);
      }
    };

    const handleCloseModal = (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      setIsModalOpen(false);
    };

    const progress = calculateProgress(
      goalData?.currentValue ? Number(goalData.currentValue) : undefined,
      goalData?.startWeight ? Number(goalData.startWeight) : undefined,
      goalData?.goalWeight ? Number(goalData.goalWeight) : undefined
    );

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

    return (
      <>
        <div>{t(String(goalData?.goal))}</div>
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
            <Progress
              type="dashboard"
              steps={stepsCount}
              percent={Number(progress)}
              trailColor="lightgray"
              strokeColor={Number(progress) === 100 ? "#52c41a" : "#0097b2"}
              strokeWidth={14}
            />
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
    );
  }
);
