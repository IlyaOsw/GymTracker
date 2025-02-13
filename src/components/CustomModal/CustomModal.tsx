import { ConfigProvider, Modal } from "antd";
import React, { useEffect } from "react";
import { ICustomModalProps } from "types/components/custom-modal";

export const CustomModal: React.FC<ICustomModalProps> = ({
  open,
  onCancel,
  footer = null,
  children,
  className,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#141414",
            colorIcon: "lightgray",
            colorIconHover: "gray",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={onCancel}
        footer={footer}
        className={className}
        centered={true}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};
