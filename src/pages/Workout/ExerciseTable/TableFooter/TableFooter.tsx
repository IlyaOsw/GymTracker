import React from "react";
import {
  RightOutlined,
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import {
  ExerciseTableType,
  TableFooterPropsType,
} from "../../../../types/types";
import { SettingButton } from "../../../../components/SettingButton/SettingButton";

import styles from "./TableFooter.module.scss";

export const TableFooter: React.FC<TableFooterPropsType> = ({
  selectedExercise,
  data,
  setData,
  setEditWeight,
}) => {
  const { t } = useTranslation();

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

  return (
    <>
      <SettingButton onClick={addRow} icon={<PlusOutlined />}>
        {t("addRow")}
      </SettingButton>
      <div className={styles.tableFooter}>
        <CustomButton icon={<LeftOutlined />}>{t("previous")}</CustomButton>
        <CustomButton>
          {t("newEntry")}
          <RightOutlined />
        </CustomButton>
      </div>
    </>
  );
};
