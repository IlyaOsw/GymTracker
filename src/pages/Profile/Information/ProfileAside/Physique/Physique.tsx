import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { CheckOutlined } from "@ant-design/icons";

import { SubTitle } from "../../../../../components/SubTitle/SubTitle";
import { Hexagon } from "../../../../../components/Hexagon/Hexagon";
import { SettingButton } from "../../../../../components/SettingButton/SettingButton";
import NumericInput from "../../../../../components/NumericInput/NumericInput";
import { ClosableMessage } from "../../../../../components/ClosableMessage/ClosableMessage";
import { Loader } from "../../../../../components/Loader/Loader";

import styles from "./Physique.module.scss";

export const Physique: React.FC = () => {
  const { t } = useTranslation();
  const [height, setHeight] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialHeight, setInitialHeight] = useState<string | undefined>(
    undefined
  );
  const [initialWeight, setInitialWeight] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const auth = getAuth();
    const fetchHeightAndWeight = async (user: User | null) => {
      if (user) {
        setLoading(true);
        const data = await fetchHeightAndWeightData(user.uid);
        setHeight(data?.height);
        setWeight(data?.weight);
        setInitialHeight(data?.height);
        setInitialWeight(data?.weight);
        setLoading(false);
      } else {
        setHeight(undefined);
        setWeight(undefined);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchHeightAndWeight);
    fetchHeightAndWeight(auth.currentUser);

    return () => unsubscribe();
  }, []);

  const fetchHeightAndWeightData = async (userId: string) => {
    try {
      const docRef = doc(getFirestore(), "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return { height: data.height, weight: data.weight };
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const handleSaveChanges = async () => {
    const auth = getAuth();
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
        ClosableMessage({
          type: "success",
          content: t("heightAndWeightSaved"),
        });
        setInitialHeight(height);
        setInitialWeight(weight);
      } catch (error) {
        ClosableMessage({ type: "error", content: t("heightAndWeightError") });
      }
      setEditMode(false);
    }
  };

  const handleEditMode = () => setEditMode(true);

  if (loading) {
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
