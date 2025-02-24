import { UserDeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResetButton } from "components/ResetButton/ResetButton";

import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount/ConfirmDeleteAccount";

export const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState<boolean>(false);

  return (
    <>
      <div style={{ margin: "50px 0px 25px 0px" }}>
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
