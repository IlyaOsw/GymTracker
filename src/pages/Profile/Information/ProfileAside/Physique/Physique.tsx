import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useTranslation } from "react-i18next";

import { SubTitle } from "../../../../../components/SubTitle/SubTitle";
import { Hexagon } from "../../../../../components/Hexagon/Hexagon";
import { PhysiquePropsType } from "../../../../../types/physique";
import { Loader } from "../../../../../components/Loader/Loader";

import styles from "./Physique.module.scss";
import { EditPhysique } from "./EditPhysique/EditPhysique";

export const Physique: React.FC<PhysiquePropsType> = React.memo(
  ({ userData }) => {
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

    const handleEditMode = () => setEditMode(true);

    if (loading || height === undefined || weight === undefined) {
      return <Loader />;
    }

    return (
      <div className={styles.physique}>
        <SubTitle>{t("physique")}</SubTitle>
        {editMode ? (
          <EditPhysique
            height={height}
            weight={weight}
            initialHeight={initialHeight}
            initialWeight={initialWeight}
            setEditMode={setEditMode}
            setInitialHeight={setInitialHeight}
            setInitialWeight={setInitialWeight}
            setHeight={setHeight}
            setWeight={setWeight}
          />
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
  }
);
