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

  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const userDoc = doc(getFirestore(), "users", userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (userData) {
      setHeight(userData.height);
      setWeight(userData.weight);
    }
  }, [userData]);

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleSaveChanges = async () => {
    if (auth.currentUser && height && weight) {
      if (height === userData?.height && weight === userData?.weight) {
        ClosableMessage({ type: "warning", content: t("notChanged") });
        setEditMode(false);
        return;
      }

      await updateUserDataInDb(auth.currentUser.uid, height, weight);
      setEditMode(false);

      setUserData((prevData) =>
        prevData ? { ...prevData, height, weight } : null
      );
    }
  };

  const updateUserDataInDb = async (
    userId: string,
    height: string,
    weight: string
  ) => {
    try {
      const userDoc = doc(getFirestore(), "users", userId);
      await updateDoc(userDoc, { height, weight });
      ClosableMessage({ type: "success", content: t("heightAndWeightSaved") });
    } catch (error) {
      ClosableMessage({ type: "error", content: t("heightAndWeightError") });
    }
  };

  if (!userData) {
    return <div className={styles.profileContainer} />;
  }

  return (
    <div className={styles.physique}>
      <SubTitle children={t("physique")} />
      {editMode ? (
        <>
          <div className={styles.editWrapper}>
            <div>
              <span className={styles.editTitle}>{t("userHeight")}</span>
              <NumericInput
                value={height}
                onChange={(value: string) => setHeight(value)}
              />
            </div>
            <div>
              <span className={styles.editTitle}>{t("userWeight")}</span>
              <NumericInput
                value={weight}
                onChange={(value: string) => setWeight(value)}
              />
            </div>
          </div>
          <SettingButton
            icon={<CheckOutlined />}
            onClick={handleSaveChanges}
            className={styles.saveBtn}
          >
            <span>{t("saveChanges")}</span>
          </SettingButton>
        </>
      ) : (
        <div className={styles.wrapper}>
          <div>
            <div className={styles.hexagonTitle}>{t("userHeight")}</div>
            <div className={styles.hexagonContainer}>
              <Hexagon
                text={`${userData.height}`}
                className={styles.hexagon}
                onClick={handleEditMode}
              />
            </div>
          </div>
          <div>
            <div className={styles.hexagonTitle}>{t("userWeight")}</div>
            <div className={styles.hexagonContainer}>
              <Hexagon
                text={`${userData.weight}`}
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
