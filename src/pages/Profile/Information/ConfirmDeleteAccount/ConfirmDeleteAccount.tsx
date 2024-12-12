import React from "react";
import { useTranslation } from "react-i18next";

import { deleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { ConfirmDeleteAccountPropsType } from "../../../../types/types";
import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";

import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal";

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
          if (
            error instanceof FirebaseError &&
            error.code === "storage/object-not-found"
          ) {
          } else {
            throw error;
          }
        }

        try {
          await deleteObject(coverRef);
        } catch (error) {
          if (
            error instanceof FirebaseError &&
            error.code === "storage/object-not-found"
          ) {
          } else {
            throw error;
          }
        }
        await deleteUser(user);

        ClosableMessage({ type: "success", content: t("accountDeleted") });
      } catch (error) {
        ClosableMessage({ type: "error", content: t("errorDeletingAccount") });
      } finally {
        navigate("/main");
      }
    }
  };

  return (
    <ConfirmDeleteModal
      isModalOpen={confirm}
      text={t("confirmDeletingAccount")}
      onClick={handleDeleteAccount}
      handleCancel={() => setConfirm(false)}
    />
  );
};
