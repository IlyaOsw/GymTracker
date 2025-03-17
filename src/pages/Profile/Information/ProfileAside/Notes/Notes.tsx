import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

import { CustomButton } from "components/CustomButton/CustomButton";
import { SubTitle } from "components/SubTitle/SubTitle";
import { NotesPropsType } from "types/notes";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { useAuth } from "context/AuthContext";

import { DeleteNote } from "./DeleteNote/DeleteNote";
import styles from "./Notes.module.scss";

export const Notes: React.FC<NotesPropsType> = ({ userData }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [notesVisible, setNotesVisible] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>(userData?.noteText || "");
  const [savedNote, setSavedNote] = useState<string>(userData?.noteText || "");

  useEffect(() => {
    setNoteText(userData?.noteText || "");
    setSavedNote(userData?.noteText || "");
    if (userData?.noteText) {
      setNotesVisible(true);
    }
  }, [userData?.noteText]);

  const handleCreateNote = () => setNotesVisible(true);

  const handleSaveOnBlur = async () => {
    try {
      if (user) {
        if (noteText === savedNote) {
          ClosableMessage({ type: "warning", content: t("noChanges") });
          return;
        }
        await updateDoc(doc(getFirestore(), "users", user.uid), {
          noteText: noteText,
        });
        setSavedNote(noteText);
        ClosableMessage({ type: "success", content: t("noteSaved") });
      }
    } catch (error) {
      ClosableMessage({ type: "error", content: t("noteSaveError") });
    }
  };

  return (
    <div className={styles.container}>
      {notesVisible ? null : (
        <CustomButton onClick={handleCreateNote} icon={<PlusOutlined />}>
          {t("createNote")}
        </CustomButton>
      )}
      {notesVisible && (
        <>
          <SubTitle>{t("notes")}</SubTitle>
          <TextArea
            className={styles.textarea}
            value={noteText}
            variant="borderless"
            showCount
            maxLength={150}
            onBlur={handleSaveOnBlur}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={t("notePlaceholder")}
          />
          <DeleteNote
            setNotesVisible={setNotesVisible}
            setNoteText={setNoteText}
            setSavedNote={setSavedNote}
          />
        </>
      )}
    </div>
  );
};
