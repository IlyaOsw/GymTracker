export interface ICustomModalProps {
  open: boolean;
  onCancel: (e: { stopPropagation: () => void }) => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isModalOpen?: boolean;
}
