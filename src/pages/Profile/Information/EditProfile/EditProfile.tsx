import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

import {
  animation,
  useAnimatedInView,
} from "../../../../hooks/useAnimatedInView ";
import { EditProfilePropsType } from "../../../../types/types";
import { CustomModal } from "../../../../components/CustomModal/CustomModal";

import styles from "./EditProfile.module.scss";
import { EditForm } from "./EditForm/EditForm";

export const EditProfile: React.FC<EditProfilePropsType> = ({
  onClose,
  userData,
}) => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <CustomModal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className={styles.wrapper}
    >
      <motion.div
        ref={ref}
        className={styles.info}
        initial="hidden"
        animate={controls}
        variants={animation}
      >
        {t("editInfo")}
      </motion.div>
      <EditForm
        setIsModalOpen={setIsModalOpen}
        onClose={onClose}
        userData={userData}
      />
    </CustomModal>
  );
};
