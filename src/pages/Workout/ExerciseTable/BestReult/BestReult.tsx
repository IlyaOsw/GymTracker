// @ts-nocheck
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

import { SettingButton } from "../../../../components/SettingButton/SettingButton";
import NumericInput from "../../../../components/NumericInput/NumericInput";

import styles from "./BestReult.module.scss";

export const BestReult: React.FC = () => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState<boolean>(false);

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
                  <NumericInput />
                  {t("kg")}
                </div>
                <div>
                  <NumericInput />
                  {t("bestResultReps")}
                </div>
              </div>
              <div className={styles.editBtn}>
                <SettingButton
                  icon={<EditOutlined />}
                  className={styles.editExercise}
                  onClick={() => setEditMode((prev) => !prev)}
                >
                  <span>{t("updateRecord")}</span>
                </SettingButton>
              </div>
            </>
          ) : (
            <>
              <div className={styles.wrapper}>
                <div>100 {t("kg")}</div>
                <div>10 {t("bestResultReps")}</div>
              </div>
              <div className={styles.editBtn}>
                <SettingButton
                  icon={<EditOutlined />}
                  className={styles.editExercise}
                  onClick={() => setEditMode((prev) => !prev)}
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
      <Collapse size="large" items={items} bordered={false} />
    </div>
  );
};
