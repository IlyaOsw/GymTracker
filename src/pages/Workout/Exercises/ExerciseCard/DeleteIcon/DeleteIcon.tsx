import { CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { DeleteIconPropsType } from "../../../../../types/delete-icon";

import { ModalDelete } from "./ModalDelete/ModalDelete";
import styles from "./DeleteIcon.module.scss";

export const DeleteIcon: React.FC<DeleteIconPropsType> = React.memo(
  ({
    setLoading,
    setIsModalOpen,
    category,
    setData,
    isModalOpen,
    handleCancel,
    item,
    index,
    setSelectedExercise,
  }) => {
    const { t } = useTranslation();
    const [confirm, setConfirm] = useState<boolean>(false);

    const handleConfirm = () => {
      setConfirm(true);
      setIsModalOpen(true);
    };

    return (
      <>
        <div className={styles.deleteIconContainer}>
          <div className={styles.numberWrapper}>{index + 1}</div>
          <Tooltip title={t("deleteExercise")}>
            <CloseOutlined
              className={styles.deleteIcon}
              onClick={(e) => {
                e.stopPropagation();
                handleConfirm();
              }}
            />
          </Tooltip>
        </div>
        {confirm && (
          <ModalDelete
            setLoading={setLoading}
            category={category}
            setData={setData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleCancel={handleCancel}
            item={item}
            setConfirm={setConfirm}
            setSelectedExercise={setSelectedExercise}
          />
        )}
      </>
    );
  }
);
