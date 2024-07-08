import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Divider, Empty, message, Table, Tooltip } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  ExerciseTablePropsType,
  ExerciseTableType,
} from "../../../types/types";

import styles from "./ExerciseTable.module.scss";
import NumericInput from "./NumericInput/NumericInput";

export const ExerciseTable: React.FC<ExerciseTablePropsType> = ({
  selectedExercise,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ExerciseTableType[]>([]);
  const [editWeight, setEditWeight] = useState<string | null>(null);
  const [editReps, setEditReps] = useState<string | null>(null);
  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const repsInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedExercise) {
      loadExerciseData();
    } else {
      setData([]);
    }
  }, [selectedExercise]);

  useEffect(() => {
    if (editWeight && weightInputRef.current) {
      weightInputRef.current.focus();
    }
  }, [editWeight]);

  useEffect(() => {
    if (editReps && repsInputRef.current) {
      repsInputRef.current.focus();
    }
  }, [editReps]);

  const scrollToBottom = () =>
    setTimeout(() => {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

  const loadExerciseData = async () => {
    if (!selectedExercise) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const setsCollectionRef = collection(db, "sets");
      const setDocRef = doc(setsCollectionRef, selectedExercise.id);

      try {
        const docSnapshot = await getDoc(setDocRef);
        if (docSnapshot.exists()) {
          const setsData = docSnapshot.data();
          const approaches = setsData.approaches || [];

          const loadedData = approaches.map((approach: any, index: number) => ({
            key: index.toString(),
            set: index + 1,
            weight: approach.weight.toString(),
            reps: approach.reps.toString(),
            icon: <CloseOutlined />,
          }));

          setData(loadedData);
          scrollToBottom();
        } else {
          setData([]);
          scrollToBottom();
        }
      } catch (error) {
        message.error(t("errorLoadingExerciseData"));
      }
    }
  };

  const addRow = () => {
    if (!selectedExercise) {
      return;
    }

    const newData = [...data];
    const nextSet =
      newData.length > 0 ? newData[newData.length - 1].set + 1 : 1;

    const newRow: ExerciseTableType = {
      key: nextSet.toString(),
      weight: "",
      set: nextSet,
      reps: "",
      icon: <CloseOutlined />,
    };

    newData.push(newRow);
    setData(newData);
    setEditWeight(newRow.key);
  };

  const deleteRow = async (key: string) => {
    if (!selectedExercise) {
      return;
    }

    try {
      const db = getFirestore();
      const selectedExerciseId = selectedExercise.id;

      const setDocRef = doc(db, "sets", selectedExerciseId);
      const setDocSnapshot = await getDoc(setDocRef);

      if (!setDocSnapshot.exists()) {
        throw new Error(`${selectedExerciseId} does not exist`);
      }

      const { approaches } = setDocSnapshot.data();
      const approachIndex = approaches.findIndex(
        (approach: { key: string }) => approach.key === key
      );

      approaches.splice(approachIndex, 1);

      await updateDoc(setDocRef, {
        approaches: approaches,
      });

      message.success(t("exerciseDataDeletedSuccessfully"));
    } catch (error) {
      message.error(t("failedToDeleteExerciseData"));
    } finally {
      loadExerciseData();
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

  const saveExerciseData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const setsCollectionRef = collection(db, "sets");

      try {
        const batch = writeBatch(db);
        const setDocRef = doc(setsCollectionRef, selectedExercise?.id);
        const approaches = data.map((row, index) => ({
          key: index.toString(),
          reps: row.reps,
          weight: row.weight,
        }));

        batch.set(setDocRef, { approaches });

        await batch.commit();
        message.success(t("exerciseDataSaved"));
      } catch (error) {
        message.error(t("errorSavingExerciseData"));
      }
    }
  };

  const columns = [
    {
      title: `${t("set")}`,
      dataIndex: "set",
      width: "30%",
    },
    {
      title: `${t("weight")}`,
      dataIndex: "weight",
      width: "30%",
      render: (text: string, record: ExerciseTableType) =>
        editWeight === record.key ? (
          <NumericInput
            ref={weightInputRef}
            value={record.weight}
            onChange={(value) => updateWeight(record.key, value)}
            onBlur={() => setEditWeight(null)}
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
            onBlur={() => setEditReps(null)}
          />
        ) : (
          <div className={styles.repsAndDelete}>
            <div
              onClick={() => setEditReps(record.key)}
              className={styles.editableDiv}
            >
              {record.reps || t("clickToEdit")}
            </div>
            <div className={styles.deledeContainer}>
              <Tooltip title={t("deleteRow")}>
                <CloseOutlined onClick={() => deleteRow(record.key)} />
              </Tooltip>
            </div>
          </div>
        ),
    },
  ];

  return (
    <>
      <Divider style={{ backgroundColor: "gray" }} />
      <div className={styles.tableTitle}>
        <SubTitle
          children={
            selectedExercise ? selectedExercise.name : t("noExerciseSelected")
          }
        />
        <div className={styles.date}>
          {t("date")}
          {new Date().toLocaleDateString()}
        </div>
      </div>
      {selectedExercise ? (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#1A1A1A",
                headerColor: "#ffffff",
                cellFontSize: 18,
                colorBgContainer: "#282828",
                colorText: "#ffffff",
                colorPrimary: "#ffffff",
                rowHoverBg: "#464646",
                borderColor: "#535353",
                headerSplitColor: "#535353",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className={styles.table}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span style={{ color: "#ffffff" }}>{t("noData")}</span>
                  }
                />
              ),
            }}
          />
          <CustomButton onClick={addRow} icon={<PlusOutlined />}>
            {t("addRow")}
          </CustomButton>
          <div className={styles.tableFooter}>
            <CustomButton icon={<LeftOutlined />}>{t("previous")}</CustomButton>
            <CustomButton icon={<CheckOutlined />} onClick={saveExerciseData}>
              {t("save")}
            </CustomButton>
          </div>
        </ConfigProvider>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#1A1A1A",
                headerColor: "#ffffff",
                cellFontSize: 18,
                colorBgContainer: "#282828",
                borderColor: "#535353",
                headerSplitColor: "#535353",
              },
            },
          }}
        >
          <Table
            columns={columns}
            className={styles.table}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span style={{ color: "#ffffff" }}>{t("noData")}</span>
                  }
                />
              ),
            }}
          />
        </ConfigProvider>
      )}
    </>
  );
};
