export type ConfirmDeleteNotePropsType = {
  confirm: boolean;
  setNotesVisible: (notesVisible: boolean) => void;
  setNoteText: (noteText: string) => void;
  setSavedNote: (savedNote: string) => void;
  setConfirm: (confirm: boolean) => void;
};
