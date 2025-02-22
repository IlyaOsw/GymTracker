import React from "react";
import { useTranslation } from "react-i18next";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ConfirmDeleteModal } from "components/ConfirmDeleteModal/ConfirmDeleteModal";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { ConfirmDeleteNotePropsType } from "types/confirm-delete-note";

export const ConfirmDeleteNote: React.FC<ConfirmDeleteNotePropsType> = ({
  confirm,
  setNotesVisible,
  setNoteText,
  setSavedNote,
  setConfirm,
}) => {
  const auth = getAuth();
  const { t } = useTranslation();

  const handleDeleteNote = async () => {
    try {
      if (auth.currentUser) {
        await updateDoc(doc(getFirestore(), "users", auth.currentUser.uid), {
          noteText: "",
        });
      }
      setNotesVisible(false);
      setNoteText("");
      setSavedNote("");
      ClosableMessage({ type: "success", content: t("deletedNote") });
    } catch (error) {
      ClosableMessage({ type: "error", content: t("noteDeleteError") });
    }
  };
  return (
    <ConfirmDeleteModal
      isModalOpen={confirm}
      text={t("confirmDeletingNote")}
      onClick={handleDeleteNote}
      handleCancel={() => setConfirm(false)}
    />
  );
};
