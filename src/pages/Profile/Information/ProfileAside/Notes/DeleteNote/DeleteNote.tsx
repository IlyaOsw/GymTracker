import { DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResetButton } from "components/ResetButton/ResetButton";
import { DeleteNotePropsType } from "types/delete-note";

import { ConfirmDeleteNote } from "./ConfirmDeleteNote/ConfirmDeleteNote";

export const DeleteNote: React.FC<DeleteNotePropsType> = ({
  setNotesVisible,
  setNoteText,
  setSavedNote,
}) => {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <>
      <ResetButton onClick={() => setConfirm(true)} icon={<DeleteOutlined />}>
        {t("deleteNote")}
      </ResetButton>
      {confirm && (
        <ConfirmDeleteNote
          confirm={confirm}
          setConfirm={setConfirm}
          setSavedNote={setSavedNote}
          setNoteText={setNoteText}
          setNotesVisible={setNotesVisible}
        />
      )}
    </>
  );
};
