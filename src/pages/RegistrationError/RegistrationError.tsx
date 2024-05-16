import { Result } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../components/CustomButton/CustomButton";

import styles from "./RegistrationError.module.scss";

const Title: React.FC = () => {
  const { t } = useTranslation();
  return <div className={styles.title}>{t("registrationFailed")}</div>;
};

const SubTitle: React.FC = () => {
  const { t } = useTranslation();
  return <div className={styles.subTitle}>{t("pleaseModify")}</div>;
};

const RegistrationError: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.result}>
      <Result status="error" title={<Title />} subTitle={<SubTitle />} />
      <Link to="/signup">
        <CustomButton children={t("backToForm")} />
      </Link>
    </div>
  );
};

export default RegistrationError;
