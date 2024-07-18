import { CloseOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { DeleteRowPropsType } from "../../../../types/types";

export const DeleteRow: React.FC<DeleteRowPropsType> = ({
  selectedExercise,
  loadExerciseData,
  record,
}) => {
  const { t } = useTranslation();

  const deleteRow = async (key: string) => {
    if (!selectedExercise) {
      return;
    }
    try {
      const setDocRef = doc(getFirestore(), "sets", selectedExercise.id);
      const setDocSnapshot = await getDoc(setDocRef);

      if (!setDocSnapshot.exists()) {
        throw new Error(`${selectedExercise.id} does not exist`);
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
      loadExerciseData();
    } catch (error) {
      message.error(t("failedToDeleteExerciseData"));
    }
  };
  return (
    <Tooltip title={t("deleteRow")}>
      <CloseOutlined onClick={() => deleteRow(record.key)} />
    </Tooltip>
  );
};