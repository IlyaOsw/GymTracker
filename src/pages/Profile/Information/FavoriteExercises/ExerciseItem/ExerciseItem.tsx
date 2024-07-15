import React, { useState } from "react";
import { Collapse, Tooltip } from "antd";
import {
  RightOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ExerciseItemProps } from "../../../../../types/types";
import { CustomModal } from "../../../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../../../components/ResetButton/ResetButton";

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

  return (
    <Collapse
      key={item.id}
      defaultActiveKey={["1"]}
      bordered={false}
      expandIcon={({ isActive }) => (
        <RightOutlined rotate={isActive ? 90 : 0} />
      )}
      className={styles.collapse}
    >
      <Collapse.Panel key={item.id} header={<p>{item.name}</p>}>
        <span>{`${t("bestResult")} ${item.bestResult} ${t("kg")}`}</span>
        <div className={styles.deleteIcon}>
          <Tooltip title={t("deleteExerciseFromFavorites")} placement="bottom">
            <CloseOutlined onClick={handleConfirm} />
          </Tooltip>
        </div>
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
      </Collapse.Panel>
    </Collapse>
  );
};
