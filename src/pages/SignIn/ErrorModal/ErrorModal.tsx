import React from "react";
import { Result, Modal, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import { ErrorModalProps } from "../../../types/types";

export const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  message,
}) => {
  const { t } = useTranslation();
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#141414",
            colorIcon: "#0097B2",
            colorIconHover: "red",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        style={{ marginTop: "50px" }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorTextHeading: "#ffffff",
            },
          }}
        >
          <Result status="error" title={t(message)} />
        </ConfigProvider>
      </Modal>
    </ConfigProvider>
  );
};
