import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Collapse, message } from "antd";

import { SettingButton } from "../../../../components/SettingButton/SettingButton";
import NumericInput from "../../../../components/NumericInput/NumericInput";
import { BestResultProps } from "../../../../types/types";

import styles from "./BestResult.module.scss";

export const BestResult: React.FC<BestResultProps> = ({
  bestResult,
  onSave,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>(bestResult?.weight || "");
  const [reps, setReps] = useState<string>(bestResult?.reps || "");

  useEffect(() => {
    setWeight(bestResult?.weight || "");
    setReps(bestResult?.reps || "");
  }, [bestResult]);

  const handleSave = () => {
    onSave({ weight, reps });
    setEditMode(false);
    messageApi.open({
      type: "success",
      content: t("recordUpdated"),
    });
  };

  const genExtra = () => (
    <img
      src={process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/trophy.png"}
    />
  );

  const items = [
    {
      key: "1",
      label: <div className={styles.title}>{t("bestExerciseResult")}</div>,
      children: (
        <>
          {editMode ? (
            <>
              <div className={styles.wrapper}>
                <div>
                  <NumericInput value={weight} onChange={setWeight} />
                  <span>{t("kg")}</span>
                </div>
                <div>
                  <NumericInput value={reps} onChange={setReps} />
                  <span>{t("bestResultReps")}</span>
                </div>
              </div>
              <div className={styles.editBtn}>
                <SettingButton
                  icon={<CheckOutlined />}
                  className={styles.editExercise}
                  onClick={handleSave}
                >
                  <span>{t("saveRecord")}</span>
                </SettingButton>
              </div>
            </>
          ) : (
            <>
              <div className={styles.wrapper}>
                <div>
                  {weight} {t("kg")}
                </div>
                <div>
                  {reps} {t("bestResultReps")}
                </div>
              </div>
              <div className={styles.editBtn}>
                <SettingButton
                  icon={<EditOutlined />}
                  className={styles.editExercise}
                  onClick={() => setEditMode(true)}
                >
                  <span>{t("updateRecord")}</span>
                </SettingButton>
              </div>
            </>
          )}
        </>
      ),
      extra: genExtra(),
    },
  ];

  return (
    <div className={styles.collapse}>
      {contextHolder}
      <Collapse size="large" items={items} bordered={false} />
    </div>
  );
};
