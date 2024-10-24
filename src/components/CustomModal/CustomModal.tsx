import { ConfigProvider, Modal } from "antd";
import React, { useEffect } from "react";

import { CustomModalProps } from "../../types/types";

export const CustomModal: React.FC<CustomModalProps> = ({
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
        style={{ marginTop: "40px" }}
        className={className}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};
