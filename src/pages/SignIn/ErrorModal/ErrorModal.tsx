import React from "react";
import { Result, Modal, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import { ErrorModalProps } from "../../../types/types";

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose, message }) => {
  const { t } = useTranslation();
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#E2E2E2",
            headerBg: "#E2E2E2",
            titleColor: "#ff4d4f",
          },
        },
      }}
    >
      <Modal open={open} title={t("error")} onCancel={onClose} footer={null}>
        <Result status="error" title={t(message)} />
      </Modal>
    </ConfigProvider>
  );
};

export default ErrorModal;
