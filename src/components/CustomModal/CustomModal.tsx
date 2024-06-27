import { ConfigProvider, Modal } from "antd";
import React from "react";

import { CustomModalProps } from "../../types/types";

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onCancel,
  footer = null,
  children,
}) => {
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
        style={{ marginTop: "50px" }}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};
