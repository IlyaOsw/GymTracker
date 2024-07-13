import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { deleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { CustomModal } from "../../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../../components/ResetButton/ResetButton";
import { ConfirmDeleteAccountPropsType } from "../../../../types/types";

import styles from "./ConfirmDeleteAccount.module.scss";

export const ConfirmDeleteAccount: React.FC<ConfirmDeleteAccountPropsType> = ({
  confirm,
  setConfirm,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const db = getFirestore();
        const storage = getStorage();

        await deleteDoc(doc(db, "users", user.uid));
        await deleteDoc(doc(db, "exercises", user.uid));

        const avatarRef = ref(storage, `avatar/${user.uid}`);
        const coverRef = ref(storage, `cover/${user.uid}`);

        await deleteObject(avatarRef).catch((error) => {
          if (error.code !== "storage/object-not-found") {
            throw error;
          }
        });
        await deleteObject(coverRef).catch((error) => {
          if (error.code !== "storage/object-not-found") {
            throw error;
          }
        });
        await deleteUser(user);
        navigate("/main");
        message.success(t("accountDeleted"));
      } catch (error) {
        alert("error");
      }
    }
  };

  return (
    <CustomModal open={confirm} onCancel={() => setConfirm(false)}>
      <p className={styles.confirm}>{t("confirmDeletingAccount")}</p>
      <div className={styles.delete}>
        <ResetButton
          children={t("delete")}
          onClick={handleDeleteAccount}
          icon={<DeleteOutlined />}
        />
      </div>
    </CustomModal>
  );
};
