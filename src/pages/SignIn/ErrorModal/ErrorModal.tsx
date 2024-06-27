import React from "react";
import { Result, Modal, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import { ErrorModalProps } from "../../../types/types";
import { CustomModal } from "../../../components/CustomModal/CustomModal";

export const ErrorModal: React.FC<ErrorModalProps> = ({
  open,
  onClose,
  message,
}) => {
  const { t } = useTranslation();
  return (
    <CustomModal open={open} onCancel={onClose} footer={null}>
      <ConfigProvider
        theme={{
          token: {
            colorTextHeading: "#ffffff",
          },
        }}
      >
        <Result status="error" title={t(message)} />
      </ConfigProvider>
    </CustomModal>
  );
};
