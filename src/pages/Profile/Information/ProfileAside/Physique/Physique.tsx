import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { CheckOutlined } from "@ant-design/icons";

import { SubTitle } from "../../../../../components/SubTitle/SubTitle";
import { Hexagon } from "../../../../../components/Hexagon/Hexagon";
import { SettingButton } from "../../../../../components/SettingButton/SettingButton";
import NumericInput from "../../../../../components/NumericInput/NumericInput";
import { ClosableMessage } from "../../../../../components/ClosableMessage/ClosableMessage";
import { PhysiquePropsType } from "../../../../../types/types";
import { Loader } from "../../../../../components/Loader/Loader";

import styles from "./Physique.module.scss";

export const Physique: React.FC<PhysiquePropsType> = ({ userData }) => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [height, setHeight] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialHeight, setInitialHeight] = useState<string | undefined>(
    undefined
  );
  const [initialWeight, setInitialWeight] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const setHeightAndWeight = async (user: User | null) => {
      setLoading(true);
      if (user) {
        setHeight(userData?.height);
        setWeight(userData?.weight);
        setInitialHeight(userData?.height);
        setInitialWeight(userData?.weight);
      } else {
        setHeight(undefined);
        setWeight(undefined);
      }
      setLoading(false);
    };

    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await setHeightAndWeight(user);
    });

    setHeightAndWeight(auth.currentUser);

    return () => unsubscribe();
  }, [userData, auth]);

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
        ClosableMessage({ type: "error", content: t("heightAndWeightError") });
      } finally {
        setEditMode(false); // Переносим сюда
      }
    }
  };

  const handleEditMode = () => setEditMode(true);

  if (loading || height === undefined || weight === undefined) {
    return <Loader />;
  }

  return (
    <div className={styles.physique}>
      <SubTitle>{t("physique")}</SubTitle>
      {editMode ? (
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
      ) : (
        <div className={styles.wrapper}>
          <div>
            <div className={styles.hexagonTitle}>{t("userHeight")}</div>
            <Hexagon text={`${height} ${t("cm")}`} onClick={handleEditMode} />
          </div>
          <div>
            <div className={styles.hexagonTitle}>{t("userWeight")}</div>
            <Hexagon text={`${weight} ${t("kg")}`} onClick={handleEditMode} />
          </div>
        </div>
      )}
    </div>
  );
};
