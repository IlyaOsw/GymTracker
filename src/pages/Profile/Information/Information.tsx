import React, { useEffect, useState } from "react";
import { Divider, Skeleton } from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { db } from "../../..";
import { useUserContext } from "../../../context/UserContext";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { IUserData } from "../../../types/types";
import { ResetButton } from "../../../components/ResetButton/ResetButton";

import styles from "./Information.module.scss";
import { UserInfo } from "./UserInfo/UserInfo";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { CoverImage } from "./CoverImage/CoverImage";
import { EditProfile } from "./EditProfile/EditProfile";
import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount/ConfirmDeleteAccount";
import { ProfileAside } from "./ProfileAside/ProfileAside";

export const Information: React.FC = React.memo(() => {
  const auth = getAuth();
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { updateUserData } = useUserContext();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadUserPhotos(user);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchData = async (user: User | null) => {
      setLoading(true);
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, fetchData);
    fetchData(auth.currentUser);

    return () => unsubscribe();
  }, [auth, updateUserData]);

  const fetchUserData = async (userId: string): Promise<IUserData | null> => {
    try {
      const docSnap = await getDoc(doc(getFirestore(), "users", userId));
      if (docSnap.exists()) {
        return docSnap.data() as IUserData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleEditProfile = () => setEdit(true);
  const handleModalClose = () => setEdit(false);
  const handleConfirmDelete = () => setConfirm(true);

  const loadUserPhotos = async (user: User) => {
    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      const userData = docSnap.data() as IUserData;
      setUserData(userData);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <CoverImage />
        <ProfileAvatar />
      </div>
      <div className={styles.infoContainer}>
        {loading ? (
          <Skeleton
            active
            className={styles.sceleton}
            paragraph={{ rows: 5, width: ["100%", "80%", "70%", "90%"] }}
          />
        ) : (
          <UserInfo userData={userData} />
        )}
        <ProfileAside userData={userData} />
      </div>
      <div className={styles.buttons}>
        <ResetButton
          icon={<UserDeleteOutlined />}
          onClick={handleConfirmDelete}
        >
          {t("delete")}
        </ResetButton>
        <CustomButton icon={<EditOutlined />} onClick={handleEditProfile}>
          <span>{t("editProfile")}</span>
        </CustomButton>
      </div>
      <Divider style={{ backgroundColor: "gray" }} />
      {edit && <EditProfile onClose={handleModalClose} />}
      {confirm && (
        <ConfirmDeleteAccount confirm={confirm} setConfirm={setConfirm} />
      )}
    </>
  );
});
