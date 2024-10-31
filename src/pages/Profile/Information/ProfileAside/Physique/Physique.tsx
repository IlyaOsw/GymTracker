import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { CheckOutlined } from "@ant-design/icons";

import { UserData } from "../../../../../types/types";
import { useUserContext } from "../../../../../context/UserContext";
import { SubTitle } from "../../../../../components/SubTitle/SubTitle";
import { Hexagon } from "../../../../../components/Hexagon/Hexagon";
import { SettingButton } from "../../../../../components/SettingButton/SettingButton";
import NumericInput from "../../../../../components/NumericInput/NumericInput";
import { ClosableMessage } from "../../../../../components/ClosableMessage/ClosableMessage";

import styles from "./Physique.module.scss";

export const Physique: React.FC = () => {
  const auth = getAuth();
  const { t } = useTranslation();
  const { updateUserData } = useUserContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [height, setHeight] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (user: User | null) => {
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, fetchData);
    fetchData(auth.currentUser);

    return () => unsubscribe();
  }, [updateUserData]);

  useEffect(() => {
    if (userData) {
      setHeight(userData.height);
      setWeight(userData.weight);
    }
  }, [userData]);

  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const docSnap = await getDoc(doc(getFirestore(), "users", userId));
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleEditMode = () => setEditMode(true);
  const handleSave = () => handleSaveChanges();

  const updateUserDataInDb = async (
    userId: string,
    height: string,
    weight: string
  ) => {
    try {
      await updateDoc(doc(getFirestore(), "users", userId), { height, weight });
      ClosableMessage({ type: "success", content: t("heightAndWeightSaved") });
    } catch (error) {
      ClosableMessage({ type: "error", content: t("heightAndWeightError") });
    }
  };

  const handleSaveChanges = async () => {
    if (auth.currentUser && height && weight) {
      if (height === userData?.height && weight === userData?.weight) {
        ClosableMessage({ type: "warning", content: t("notChanged") });
        setEditMode(false);
        return;
      }

      if (Number(height) > 250 || Number(weight) > 250) {
        setHeight(userData?.height);
        setWeight(userData?.weight);
        setEditMode(false);
        ClosableMessage({ type: "error", content: t("notValidData") });
        return;
      }

      await updateUserDataInDb(auth.currentUser.uid, height, weight);
      setEditMode(false);
      setUserData((prevData) =>
        prevData ? { ...prevData, height, weight } : null
      );
    }
  };

  return (
    <div className={styles.physique}>
      <SubTitle children={t("physique")} />
      {editMode ? (
        <>
          <div className={styles.editWrapper}>
            <div>
              <span>{t("userHeight")}</span>
              <NumericInput
                value={height}
                onChange={(value: string) => setHeight(value)}
              />
              <span>{t("cm")}</span>
            </div>
            <div>
              <span>{t("userWeight")}</span>
              <NumericInput
                value={weight}
                onChange={(value: string) => setWeight(value)}
                onBlur={handleSave}
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
            <div className={styles.hexagonTitle}>{t("userHeight")} </div>
            <div className={styles.hexagonContainer}>
              <Hexagon
                text={`${userData?.height} ${t("cm")}`}
                className={styles.hexagon}
                onClick={handleEditMode}
              />
            </div>
          </div>
          <div>
            <div className={styles.hexagonTitle}>{t("userWeight")}</div>
            <div className={styles.hexagonContainer}>
              <Hexagon
                text={`${userData?.weight} ${t("kg")}`}
                className={styles.hexagon}
                onClick={handleEditMode}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
