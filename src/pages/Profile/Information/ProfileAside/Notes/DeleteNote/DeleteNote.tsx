import { DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { ResetButton } from "components/ResetButton/ResetButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { DeleteNotePropsType } from "types/delete-note";

export const DeleteNote: React.FC<DeleteNotePropsType> = ({
  setNotesVisible,
  setNoteText,
  setSavedNote,
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
    <ResetButton onClick={handleDeleteNote} icon={<DeleteOutlined />}>
      {t("deleteNote")}
    </ResetButton>
  );
};
