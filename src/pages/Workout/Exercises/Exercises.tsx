import React, { useEffect, useState } from "react";
import {
  Card,
  ConfigProvider,
  Empty,
  message,
  notification,
  Tooltip,
} from "antd";
import { useTranslation } from "react-i18next";
import {
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  StarFilled,
} from "@ant-design/icons";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";
import { CustomModal } from "../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../components/ResetButton/ResetButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";

import styles from "./Exercises.module.scss";

export const Exercises: React.FC<ExercisesProps> = ({
  category,
  updateTrigger,
  onSelectExercise,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("exercisesData") || "[]"
    );

    if (storedData.length > 0) {
      setData(storedData);
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);

      try {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;
          const exercisesDocRef = doc(db, "exercises", userId);
          const exercisesDoc = await getDoc(exercisesDocRef);

          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            const translatedCategory = t(`categories.${category}`);
            const filteredData = exercisesData.exercises
              .filter(
                (exercise: Exercise) =>
                  t(`categories.${exercise.category}`) === translatedCategory
              )
              .map((exercise: Exercise) => ({
                id: exercise.id,
                name: t(exercise.name),
                category: exercise.category,
                bestResult: `${t("lastSet")}: ${exercise.bestResult}`,
                isFavorite: exercise.isFavorite,
              }));
            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
            setData(filteredData);
          } else {
            setData([]);
          }
        }
      } catch (error) {
        notification.error({ message: t("errorFetchingExercises") });
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [category, t, updateTrigger]);

  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    setConfirm(true);
    setIsModalOpen(true);
  };

  const toggleFavorite = async (exerciseId: string, currentStatus: boolean) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(db, "exercises", userId);
        const exercisesDoc = await getDoc(exercisesDocRef);

        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          let updatedExercises = exercisesData.exercises.map(
            (exercise: { id: string }) => {
              if (exercise.id === exerciseId) {
                return { ...exercise, isFavorite: !currentStatus };
              }
              return exercise;
            }
          );

          await updateDoc(exercisesDocRef, {
            exercises: updatedExercises,
          });

          const translatedCategory = t(`categories.${category}`);
          const filteredData = updatedExercises.filter(
            (exercise: { category: string }) =>
              t(`categories.${exercise.category}`) === translatedCategory
          );
          setData(filteredData);
        }

        if (!currentStatus) {
          message.success(t("addedToFavorite"));
        } else {
          message.success(t("removedFromFavorite"));
        }
        setIsActive(!isActive);
      }
    } catch (error) {
      message.error(t("errorUpdatingFavorite"));
    }
  };

  const handleDeleteCard = async (exerciseId: string) => {
    setLoading(true);

    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(db, "exercises", userId);
        const setsCollectionRef = doc(db, "sets", exerciseId);
        const exercisesDoc = await getDoc(exercisesDocRef);

        await deleteDoc(setsCollectionRef);

        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          let updatedExercises: Exercise[] = [];

          if (exercisesData && exercisesData.exercises) {
            updatedExercises = exercisesData.exercises.filter(
              (exercise: Exercise) => exercise.id !== exerciseId
            );

            await updateDoc(exercisesDocRef, {
              exercises: updatedExercises,
            });
            message.success(t("exerciseDeleted"));

            const translatedCategory = t(`categories.${category}`);
            const filteredData = updatedExercises.filter(
              (exercise: Exercise) =>
                t(`categories.${exercise.category}`) === translatedCategory
            );
            setData(filteredData);
            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
          }
        }
      }
      setConfirm(false);
    } catch (error) {
      message.error(t("errorDeletingExercise"));
    } finally {
      setLoading(false);
    }
  };

  const changeExerciseName = async (exerciseId: string, newName: string) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(db, "exercises", userId);
        const exercisesDoc = await getDoc(exercisesDocRef);
        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          let updatedExercises = exercisesData.exercises.map(
            (exercise: { id: string; name: string }) => {
              if (exercise.id === exerciseId) {
                return { ...exercise, name: newName };
              }
              return exercise;
            }
          );
          await updateDoc(exercisesDocRef, {
            exercises: updatedExercises,
          });

          const translatedCategory = t(`categories.${category}`);
          const filteredData = updatedExercises
            .filter(
              (exercise: { category: string }) =>
                t(`categories.${exercise.category}`) === translatedCategory
            )
            .map(
              (exercise: {
                id: string;
                name: string;
                category: string;
                bestResult: string;
                isFavorite: boolean;
              }) => ({
                id: exercise.id,
                name: t(exercise.name),
                category: exercise.category,
                bestResult: `${t("lastSet")}: ${exercise.bestResult}`,
                isFavorite: exercise.isFavorite,
              })
            );

          localStorage.setItem("exercisesData", JSON.stringify(filteredData));
          setData(filteredData);
        }
      }
    } catch (error) {
      message.error(t("nameChangeFailed"));
    }
  };

  const handleEditClick = (exerciseId: string, currentName: string) => {
    setCurrentEditingId(exerciseId);
    setNewName(currentName);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleEditKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && currentEditingId) {
      changeExerciseName(currentEditingId, newName);
      setEditMode(false);
      setCurrentEditingId(null);
      setIsModalOpen(false);
    }
  };

  const handleBlur = () => {
    if (currentEditingId) {
      changeExerciseName(currentEditingId, newName);
      setEditMode(false);
      setCurrentEditingId(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SubTitle children={t("exercises")} className={styles.title} />
          <ConfigProvider
            theme={{
              components: {
                Card: {
                  headerFontSize: 20,
                  headerBg: "#1a1a1a",
                  colorTextHeading: "#ffffff",
                  fontSize: 16,
                  colorBorderSecondary: "#535353",
                },
              },
            }}
          >
            <Card
              title={
                <span className={styles.cardTitle}>{t("chooseExercise")}</span>
              }
              className={styles.exercises}
              bordered={false}
            >
              {data.length > 0 ? (
                data.map((item: Exercise) => (
                  <Card.Grid
                    key={item.id}
                    onClick={() => onSelectExercise(item)}
                  >
                    <div className={styles.deleteIconBlock}>
                      <Tooltip title={t("deleteExercise")}>
                        <CloseOutlined
                          className={styles.deleteIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm();
                          }}
                        />
                      </Tooltip>
                      {confirm && (
                        <CustomModal
                          open={isModalOpen}
                          onCancel={handleCancel}
                          footer={false}
                        >
                          <p className={styles.confirm}>
                            {t("confirmDeletingExercise")}
                          </p>
                          <div className={styles.deleteSave}>
                            <ResetButton
                              children={t("delete")}
                              onClick={() => handleDeleteCard(item.id)}
                              icon={<DeleteOutlined />}
                            />
                          </div>
                        </CustomModal>
                      )}
                    </div>
                    {currentEditingId === item.id && editMode ? (
                      <CustomModal
                        open={isModalOpen}
                        onCancel={() => {
                          handleCancel();
                          setNewName(item.name);
                          setEditMode(false);
                          setCurrentEditingId(null);
                        }}
                        footer={false}
                      >
                        <div className={styles.inputContainer}>
                          <input
                            type="text"
                            value={newName}
                            className={styles.editInput}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className={styles.deleteSave}>
                          <CustomButton
                            children={t("save")}
                            onClick={() =>
                              changeExerciseName(currentEditingId, newName)
                            }
                            icon={<CheckCircleOutlined />}
                          />
                        </div>
                      </CustomModal>
                    ) : (
                      <span>{item.name}</span>
                    )}
                    <div className={styles.options}>
                      <Tooltip title={t("addToFavorite")}>
                        <StarFilled
                          className={`${styles.star} ${
                            item.isFavorite ? styles.active : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id, item.isFavorite);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={t("editName")}>
                        <EditOutlined
                          className={styles.editIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(item.id, item.name);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </Card.Grid>
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span style={{ color: "#ffffff" }}>{t("noData")}</span>
                  }
                />
              )}
            </Card>
          </ConfigProvider>
        </>
      )}
    </>
  );
};
