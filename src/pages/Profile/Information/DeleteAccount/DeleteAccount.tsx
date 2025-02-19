import { UserDeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResetButton } from "components/ResetButton/ResetButton";

import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount/ConfirmDeleteAccount";

import styles from "./DeleteAccount.module.scss";

export const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <>
      <div className={styles.deleteBtn}>
        <ResetButton
          icon={<UserDeleteOutlined />}
          onClick={() => setConfirm(true)}
        >
          {t("deleteAcccount")}
        </ResetButton>
      </div>
      {confirm && (
        <ConfirmDeleteAccount confirm={confirm} setConfirm={setConfirm} />
      )}
    </>
  );
};
