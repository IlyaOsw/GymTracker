import { useTranslation } from "react-i18next";
import { CheckOutlined } from "@ant-design/icons";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import NumericInput from "../../../../../../components/NumericInput/NumericInput";
import { SettingButton } from "../../../../../../components/SettingButton/SettingButton";
import { ClosableMessage } from "../../../../../../components/ClosableMessage/ClosableMessage";
import { EditPhysiquePropsType } from "../../../../../../types/types";

import styles from "../Physique.module.scss";

export const EditPhysique: React.FC<EditPhysiquePropsType> = ({
  height,
  weight,
  initialHeight,
  initialWeight,
  setEditMode,
  setInitialHeight,
  setInitialWeight,
  setHeight,
  setWeight,
}) => {
  const auth = getAuth();
  const { t } = useTranslation();

  const handleSaveChanges = async () => {
    if (auth.currentUser && height && weight) {
      if (height === initialHeight && weight === initialWeight) {
        ClosableMessage({ type: "warning", content: t("notChanged") });
        setEditMode(false);
        return;
      }

      if (Number(height) > 250 || Number(weight) > 250) {
        ClosableMessage({ type: "error", content: t("notValidData") });
        return;
      }

      try {
        await updateDoc(doc(getFirestore(), "users", auth.currentUser.uid), {
          height,
          weight,
        });

        setInitialHeight(height);
        setInitialWeight(weight);
        ClosableMessage({
          type: "success",
          content: t("heightAndWeightSaved"),
        });
      } catch (error) {
        ClosableMessage({
          type: "error",
          content: t("heightAndWeightError"),
        });
      } finally {
        setEditMode(false);
      }
    }
  };

  return (
    <>
      <div className={styles.editWrapper}>
        <div className={styles.container}>
          <span>{t("userHeight")}</span>
          <NumericInput
            value={height}
            onChange={(value: string) => setHeight(value)}
          />
          <span>{t("cm")}</span>
        </div>
        <div className={styles.container}>
          <span>{t("userWeight")}</span>
          <NumericInput
            value={weight}
            onChange={(value: string) => setWeight(value)}
            onBlur={handleSaveChanges}
          />
          <span>{t("kg")}</span>
        </div>
      </div>
      <SettingButton icon={<CheckOutlined />} onClick={handleSaveChanges}>
        <span>{t("saveChanges")}</span>
      </SettingButton>
    </>
  );
};
