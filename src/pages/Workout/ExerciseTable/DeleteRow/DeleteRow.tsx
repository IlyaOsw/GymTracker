import { CloseOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { DeleteRowPropsType } from "../../../../types/types";

export const DeleteRow: React.FC<DeleteRowPropsType> = ({
  selectedExercise,
  loadExerciseData,
  index,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const deleteRow = async (index: number) => {
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
      if (index < 0 || index >= approaches.length) {
        throw new Error("Invalid index");
      }
      approaches.splice(index, 1);

      await updateDoc(setDocRef, {
        approaches: approaches,
      });

      messageApi.open({
        type: "success",
        content: t("exerciseDataDeletedSuccessfully"),
      });

      loadExerciseData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: t("failedToDeleteExerciseData"),
      });
    }
  };

  return (
    <Tooltip title={t("deleteRow")}>
      {contextHolder}
      <CloseOutlined onClick={() => deleteRow(index)} />
    </Tooltip>
  );
};
