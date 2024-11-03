import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { deleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { CustomModal } from "../../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../../components/ResetButton/ResetButton";
import { ConfirmDeleteAccountPropsType } from "../../../../types/types";
import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";

import styles from "./ConfirmDeleteAccount.module.scss";

export const ConfirmDeleteAccount: React.FC<ConfirmDeleteAccountPropsType> = ({
  confirm,
  setConfirm,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const user = getAuth().currentUser;

    if (user) {
      try {
        const storage = getStorage();
        await deleteDoc(doc(getFirestore(), "users", user.uid));
        await deleteDoc(doc(getFirestore(), "exercises", user.uid));

        const avatarRef = ref(storage, `avatar/${user.uid}`);
        const coverRef = ref(storage, `cover/${user.uid}`);

        try {
          await deleteObject(avatarRef);
        } catch (error) {
          // Handle error if object doesn't exist
          if (
            error instanceof FirebaseError &&
            error.code === "storage/object-not-found"
          ) {
            // Ignore the error for object not found
          } else {
            throw error; // Re-throw other errors
          }
        }

        // Delete cover if it exists
        try {
          await deleteObject(coverRef);
        } catch (error) {
          // Handle error if object doesn't exist
          if (
            error instanceof FirebaseError &&
            error.code === "storage/object-not-found"
          ) {
            // Ignore the error for object not found
          } else {
            throw error; // Re-throw other errors
          }
        }
        await deleteUser(user);

        navigate("/main");
        ClosableMessage({ type: "success", content: t("accountDeleted") });
      } catch (error) {
        ClosableMessage({ type: "error", content: t("errorDeletingAccount") });
        navigate("/main");
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
