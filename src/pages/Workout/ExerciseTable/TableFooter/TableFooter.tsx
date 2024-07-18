import React from "react";
import {
  CheckOutlined,
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, writeBatch } from "firebase/firestore";
import { message } from "antd";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import {
  ExerciseTableType,
  TableFooterPropsType,
} from "../../../../types/types";

import styles from "./TableFooter.module.scss";

export const TableFooter: React.FC<TableFooterPropsType> = ({
  selectedExercise,
  data,
  setData,
  setEditWeight,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

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

  const saveExerciseData = async () => {
    const user = getAuth().currentUser;
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

  return (
    <>
      {contextHolder}
      <CustomButton onClick={addRow} icon={<PlusOutlined />}>
        {t("addRow")}
      </CustomButton>
      <div className={styles.tableFooter}>
        <CustomButton icon={<LeftOutlined />}>{t("previous")}</CustomButton>
        <CustomButton icon={<CheckOutlined />} onClick={saveExerciseData}>
          {t("save")}
        </CustomButton>
      </div>
    </>
  );
};
