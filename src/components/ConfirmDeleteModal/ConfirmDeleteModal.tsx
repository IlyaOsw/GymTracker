import React from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CustomButton } from "components/CustomButton/CustomButton";
import { CustomModal } from "components/CustomModal/CustomModal";
import { ResetButton } from "components/ResetButton/ResetButton";
import { IConfirmDeleteModal } from "types/components/confirm-modal";

import styles from "./ConfirmDeleteModal.module.scss";

export const ConfirmDeleteModal: React.FC<IConfirmDeleteModal> = ({
  text,
  onClick,
  isModalOpen,
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      isModalOpen={isModalOpen}
    >
      <p className={styles.title}>{text}</p>
      <div className={styles.buttons}>
        <CustomButton icon={<CloseOutlined />} onClick={handleCancel}>
          {t("close")}
        </CustomButton>
        <ResetButton
          children={t("delete")}
          onClick={onClick}
          icon={<DeleteOutlined />}
        />
      </div>
    </CustomModal>
  );
};
