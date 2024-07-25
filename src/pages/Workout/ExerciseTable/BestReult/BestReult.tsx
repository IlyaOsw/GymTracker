import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Collapse, Divider } from "antd";

import { SettingButton } from "../../../../components/SettingButton/SettingButton";

import styles from "./BestReult.module.scss";

export const BestReult: React.FC = () => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState<boolean>(false);

  const genExtra = () => (
    <img src={process.env.PUBLIC_URL + "/assets/Icons/trophy.png"} />
  );

  const items = [
    {
      key: "1",
      label: <div className={styles.title}>{t("bestExerciseResult")}</div>,
      children: (
        <>
          {editMode ? (
            <>
              <Divider style={{ backgroundColor: "gray" }} />
              <div className={styles.wrapper}>
                <input />
                <div>{t("per")}</div>
                <input />
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
              <Divider style={{ backgroundColor: "gray" }} />
              <div className={styles.wrapper}>
                <div className={styles.weight}>100 {t("kg")}</div>
                <div>{t("per")}</div>
                <div className={styles.reps}>10 {t("bestResultReps")}</div>
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
