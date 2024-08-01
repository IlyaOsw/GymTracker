import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Divider, message, Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  Exercise,
  ExerciseTablePropsType,
  ExerciseTableType,
} from "../../../types/types";
import { EmptyBox } from "../../../components/EmptyBox/EmptyBox";
import NumericInput from "../../../components/NumericInput/NumericInput";

import styles from "./ExerciseTable.module.scss";
import { TableFooter } from "./TableFooter/TableFooter";
import { DeleteRow } from "./DeleteRow/DeleteRow";
import { BestResult } from "./BestResult/BestResult";

export const ExerciseTable: React.FC<ExerciseTablePropsType> = ({
  selectedExercise,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<ExerciseTableType[]>([]);
  const [bestResult, setBestResult] = useState<{
    weight: string;
    reps: string;
  } | null>(null);
  const [editWeight, setEditWeight] = useState<string | null>(null);
  const [editReps, setEditReps] = useState<string | null>(null);
  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const repsInputRef = useRef<HTMLInputElement | null>(null);
  const user = getAuth().currentUser;

  useEffect(() => {
    if (selectedExercise) {
      loadExerciseData();
    } else {
      setData([]);
    }
  }, [selectedExercise]);

  useEffect(() => {
    if (editReps && repsInputRef.current) {
      repsInputRef.current.focus();
    }
    if (editWeight && weightInputRef.current) {
      weightInputRef.current.focus();
    }
  }, [editReps, editWeight]);

  const scrollToBottom = () =>
    setTimeout(() => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

  const loadExerciseData = async () => {
    if (user) {
      const setsCollectionRef = collection(getFirestore(), "sets");
      const setDocRef = doc(setsCollectionRef, selectedExercise?.id);
      const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
      try {
        const [docSnapshot, exercisesDoc] = await Promise.all([
          getDoc(setDocRef),
          getDoc(exercisesDocRef),
        ]);

        if (docSnapshot.exists()) {
          const approaches = docSnapshot.data().approaches || [];
          const loadedData = approaches.map(
            (
              approach: {
                weight: { toString: () => any };
                reps: { toString: () => any };
              },
              index: number
            ) => ({
              key: index.toString(),
              set: index + 1,
              weight: approach.weight.toString(),
              reps: approach.reps.toString(),
              icon: <CloseOutlined />,
            })
          );

          setData(loadedData);
          scrollToBottom();
        } else {
          setData([]);
          scrollToBottom();
        }

        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          const exercise = exercisesData.exercises.find(
            (ex: any) => ex.id === selectedExercise?.id
          );
          if (exercise) {
            setBestResult(exercise.bestResult);
          }
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("errorLoadingExerciseData"),
        });
      }
    }
  };

  const saveBestResult = async (updatedBestResult: {
    weight: string;
    reps: string;
  }) => {
    if (user && selectedExercise) {
      const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
      try {
        const exercisesDoc = await getDoc(exercisesDocRef);
        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          const updatedExercises = exercisesData.exercises.map(
            (exercise: Exercise) => {
              if (exercise.id === selectedExercise.id) {
                return {
                  ...exercise,
                  bestResult: updatedBestResult,
                };
              }
              return exercise;
            }
          );

          await updateDoc(exercisesDocRef, { exercises: updatedExercises });
          setBestResult(updatedBestResult);
        } else {
          messageApi.open({
            type: "error",
            content: t("noExercisesFound"),
          });
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("errorSavingBestResult"),
        });
        console.error("Error saving best result:", error);
      }
    }
  };

  const saveExerciseData = async () => {
    if (user) {
      const setsCollectionRef = collection(getFirestore(), "sets");
      try {
        const batch = writeBatch(getFirestore());
        const setDocRef = doc(setsCollectionRef, selectedExercise?.id);
        const approaches = data.map((row, index) => ({
          key: index.toString(),
          reps: row.reps,
          weight: row.weight,
        }));

        batch.set(setDocRef, { approaches });
        await batch.commit();
        messageApi.open({
          type: "success",
          content: t("exerciseDataSaved"),
        });
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("errorSavingExerciseData"),
        });
      }
    }
  };

  const updateWeight = (key: string, value: string) => {
    const newData = data.map((row) => {
      if (row.key === key) {
        return { ...row, weight: value };
      }
      return row;
    });
    setData(newData);
  };

  const updateReps = (key: string, value: string) => {
    const newData = data.map((row) => {
      if (row.key === key) {
        return { ...row, reps: value };
      }
      return row;
    });
    setData(newData);
  };

  const columns = [
    {
      title: `${t("set")}`,
      dataIndex: "set",
      width: "25%",
    },
    {
      title: `${t("weight")}`,
      dataIndex: "weight",
      width: "35%",
      render: (text: string, record: ExerciseTableType) =>
        editWeight === record.key ? (
          <NumericInput
            ref={weightInputRef}
            value={record.weight}
            onChange={(value) => updateWeight(record.key, value)}
            onBlur={() => {
              setEditWeight(null);
              saveExerciseData();
            }}
          />
        ) : (
          <div
            onClick={() => setEditWeight(record.key)}
            className={styles.editableDiv}
          >
            {record.weight || t("clickToEdit")}
          </div>
        ),
    },
    {
      title: `${t("reps")}`,
      dataIndex: "reps",
      width: "30%",
      render: (text: string, record: ExerciseTableType) =>
        editReps === record.key ? (
          <NumericInput
            ref={repsInputRef}
            value={record.reps}
            onChange={(value) => updateReps(record.key, value)}
            onBlur={() => {
              setEditReps(null);
              saveExerciseData();
            }}
          />
        ) : (
          <div className={styles.repsAndDelete}>
            <div
              onClick={() => setEditReps(record.key)}
              className={styles.editableDiv}
            >
              {record.reps || t("clickToEdit")}
            </div>
            <DeleteRow
              selectedExercise={selectedExercise}
              loadExerciseData={loadExerciseData}
              record={record}
            />
          </div>
        ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Divider style={{ backgroundColor: "gray" }} />
      <div className={styles.tableTitle}>
        <SubTitle
          children={selectedExercise?.name || t("noExerciseSelected")}
          className={styles.subtitle}
        />
        <div className={styles.date}>
          {t("date")}
          {new Date().toLocaleDateString()}
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#1A1A1A",
              headerColor: "#ffffff",
              cellFontSize: 18,
              colorBgContainer: "#282828",
              colorText: "#ffffff",
              borderColor: "#535353",
            },
          },
        }}
      >
        {selectedExercise ? (
          <>
            <BestResult bestResult={bestResult} onSave={saveBestResult} />
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              className={styles.table}
              locale={{ emptyText: <EmptyBox /> }}
            />
            <TableFooter
              selectedExercise={selectedExercise}
              data={data}
              setData={setData}
              setEditWeight={setEditWeight}
            />
          </>
        ) : (
          <Table
            columns={columns}
            className={styles.table}
            locale={{ emptyText: <EmptyBox /> }}
          />
        )}
      </ConfigProvider>
    </>
  );
};
