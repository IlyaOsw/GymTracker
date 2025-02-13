export interface IConfirmDeleteModal {
  text: string;
  onClick: (e: { stopPropagation: () => void }) => void;
  isModalOpen: boolean;
  handleCancel: (e: { stopPropagation: () => void }) => void;
}
