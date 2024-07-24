import React, { useState } from "react";
import { Collapse, CollapseProps } from "antd";
import {
  RightOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ExerciseItemProps } from "../../../../../types/types";
import { CustomModal } from "../../../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../../../components/ResetButton/ResetButton";
import { SettingButton } from "../../../../../components/SettingButton/SettingButton";

import styles from "./ExerciseItem.module.scss";

export const ExerciseItem: React.FC<ExerciseItemProps> = ({
  item,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setConfirm(true);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    onDelete(item.id);
    setIsModalOpen(false);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <p>{item.name}</p>,
      children: (
        <>
          <div className={styles.resultTitle}>{t("bestResult")}</div>
          <div className={styles.bestResult}>
            <div>
              <span>{t("bestResultWeight")}</span>
              <div>
                {item.bestResult} {t("kg")}
              </div>
            </div>
            <div>
              <span>{t("bestResultReps")}</span>
              <div>{item.bestResult}</div>
            </div>
          </div>
          <div className={styles.settings}>
            <SettingButton
              icon={<CloseOutlined />}
              onClick={handleConfirm}
              className={styles.btn}
            >
              <span>{t("delete")}</span>
            </SettingButton>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Collapse
        key={item.id}
        bordered={false}
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} />
        )}
        className={styles.collapse}
        items={items}
      />
      {confirm && (
        <CustomModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <p className={styles.confirm}>{t("confirmDeletingFromFavorite")}</p>
          <div className={styles.delete}>
            <ResetButton
              children={t("delete")}
              onClick={handleDelete}
              icon={<DeleteOutlined />}
            />
          </div>
        </CustomModal>
      )}
    </>
  );
};
