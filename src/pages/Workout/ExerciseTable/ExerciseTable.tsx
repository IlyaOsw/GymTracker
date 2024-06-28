import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Divider, Empty, Table, Tooltip } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { ExerciseTableType } from "../../../types/types";

import styles from "./ExerciseTable.module.scss";
import NumericInput from "./NumericInput/NumericInput";

export const ExerciseTable: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ExerciseTableType[]>([]);
  const [editWeight, setEditWeight] = useState<string | null>(null);
  const [editReps, setEditReps] = useState<string | null>(null);
  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const repsInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editWeight) {
      weightInputRef.current?.focus();
    }
    if (editReps) {
      repsInputRef.current?.focus();
    }
  }, [editWeight, editReps]);

  const addRow = () => {
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
      sorter: (a: { set: number }, b: { set: number }) => a.set - b.set,
      width: "30%",
    },
    {
      title: `${t("weight")}`,
      dataIndex: "weight",
      width: "40%",
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
          <div
            onClick={() => setEditReps(record.key)}
            className={styles.editableDiv}
          >
            {record.reps || t("clickToEdit")}
          </div>
        ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: (_: any, record: ExerciseTableType) => (
        <Tooltip title={t("deleteRow")}>
          <CloseOutlined
            className={styles.delete}
            onClick={() => deleteRow(record.key)}
          />
        </Tooltip>
      ),
    },
  ];

  const deleteRow = (key: string) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);

    setEditWeight(null);
    setEditReps(null);
  };

  const customEmpty = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span style={{ color: "#ffffff" }}>{t("noData")}</span>}
    />
  );

  const dateNow = new Date().toLocaleDateString();

  return (
    <>
      <Divider style={{ backgroundColor: "gray" }} />
      <div className={styles.tableTitle}>
        <SubTitle children={"Bench press"} />
        <div className={styles.date}>
          {t("date")}
          {dateNow}
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#1A1A1A",
              headerColor: "#ffffff",
              headerSortHoverBg: "#282828",
              bodySortBg: "#282828",
              cellFontSize: 16,
              colorBgContainer: "#282828",
              colorText: "#ffffff",
              colorPrimary: "#ffffff",
              headerBorderRadius: 0,
              rowHoverBg: "#464646",
              borderColor: "#535353",
              headerSplitColor: "#535353",
              headerSortActiveBg: "#282828",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className={styles.table}
          locale={{ emptyText: customEmpty }}
        />
        <CustomButton onClick={addRow} icon={<PlusOutlined />}>
          {t("addRow")}
        </CustomButton>
        <div className={styles.tableFooter}>
          <CustomButton icon={<LeftOutlined />}>{t("previous")}</CustomButton>
          <CustomButton icon={<CheckOutlined />}>{t("save")}</CustomButton>
        </div>
      </ConfigProvider>
    </>
  );
};
