import React, { useEffect, useState } from "react";
import { Button, Divider, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAuth, onAuthStateChanged, User } from "firebase/auth";

import { auth, db } from "../../..";
import { UserProvider } from "../../../context/UserContext";
import { CustomModal } from "../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../components/ResetButton/ResetButton";

import styles from "./Information.module.scss";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import { UserInfo } from "./UserInfo/UserInfo";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { CoverImage } from "./CoverImage/CoverImage";
import { EditProfile } from "./EditProfile/EditProfile";

export const Information: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<boolean>(false);
  const [, setUserData] = useState<any>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadUserPhotos(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfile = () => setEdit(true);

  const handleModalClose = () => setEdit(false);

  const handleConfirmDelete = () => setConfirm(true);

  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const db = getFirestore();
        const storage = getStorage();

        await deleteDoc(doc(db, "users", user.uid));
        await deleteDoc(doc(db, "exercises", user.uid));

        const avatarRef = ref(storage, `avatar/${user.uid}`);
        const coverRef = ref(storage, `cover/${user.uid}`);

        await deleteObject(avatarRef).catch((error) => {
          if (error.code !== "storage/object-not-found") {
            throw error;
          }
        });

        await deleteObject(coverRef).catch((error) => {
          if (error.code !== "storage/object-not-found") {
            throw error;
          }
        });

        await deleteUser(user);
        navigate("/main");
        message.success(t("accountDeleted"));
      } catch (error) {
        alert("error");
      }
    }
  };

  const loadUserPhotos = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUserData(userData);
    }
  };

  return (
    <UserProvider>
      <div className={styles.mainContainer}>
        <CoverImage />
        <ProfileAvatar />
      </div>
      <div className={styles.infoContainer}>
        <UserInfo />
        <FavoriteExercises />
      </div>
      <div className={styles.buttons}>
        <Button
          icon={<UserDeleteOutlined />}
          className={styles.btn}
          onClick={handleConfirmDelete}
        >
          <span className={styles.buttonText}>{t("deleteAccount")}</span>
        </Button>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditProfile}
          className={styles.btn}
        >
          <span className={styles.buttonText}>{t("editProfile")}</span>
        </Button>
      </div>
      <Divider style={{ backgroundColor: "gray" }} />
      {edit && <EditProfile onClose={handleModalClose} />}
      {confirm && (
        <CustomModal open={confirm} onCancel={() => setConfirm(false)}>
          <p className={styles.confirm}>{t("confirmDeletingAccount")}</p>
          <div className={styles.delete}>
            <ResetButton
              children={t("delete")}
              onClick={handleDeleteAccount}
              icon={<DeleteOutlined />}
            />
          </div>
        </CustomModal>
      )}
    </UserProvider>
  );
};
