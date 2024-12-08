import { ConfigProvider, Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { EmptyBox } from "../../../../components/EmptyBox/EmptyBox";
import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";
import NumericInput from "../../../../components/NumericInput/NumericInput";
import { DataTablePropsType, ExerciseTableType } from "../../../../types/types";

import styles from "./DataTable.module.scss";

export const DataTable: React.FC<DataTablePropsType> = React.memo(
  ({
    data,
    setData,
    currentWorkout,
    editWeight,
    weightInputRef,
    setEditWeight,
    editReps,
    repsInputRef,
    setEditReps,
  }) => {
    const { t } = useTranslation();

    const updateWeight = (key: string, value: string) => {
      if (Number(value) > 1000) {
        ClosableMessage({ type: "error", content: t("maxWeight1000") });
        return;
      }
      const newData = data.map((row) => {
        if (row.key === key) {
          return { ...row, weight: value };
        }
        return row;
      });
      setData(newData);
    };

    const updateReps = (key: string, value: string) => {
      if (Number(value) > 100) {
        ClosableMessage({ type: "error", content: t("maxReps100") });
        return;
      }
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
        width: "20%",
        render: (set: string) => <span>{set}.</span>,
      },
      {
        title: `${t("weight")}`,
        dataIndex: "weight",
        width: "30%",
        render: (text: string, record: ExerciseTableType) =>
          currentWorkout ? (
            editWeight === record.key ? (
              <div className={styles.inputContainer}>
                <NumericInput
                  ref={weightInputRef}
                  value={record.weight}
                  onChange={(value) => updateWeight(record.key, value)}
                  onBlur={() => setEditWeight(null)}
                />
              </div>
            ) : (
              <div
                onClick={() => setEditWeight(record.key)}
                className={styles.editableDiv}
              >
                {record.weight || t("clickToEdit")}
              </div>
            )
          ) : (
            <div className={styles.editableDiv}>{record.weight}</div>
          ),
      },
      {
        title: `${t("reps")}`,
        dataIndex: "reps",
        width: "25%",
        render: (text: string, record: ExerciseTableType) =>
          currentWorkout ? (
            editReps === record.key ? (
              <div className={styles.inputContainer}>
                <NumericInput
                  ref={repsInputRef}
                  value={record.reps}
                  onChange={(value) => updateReps(record.key, value)}
                  onBlur={() => setEditReps(null)}
                />
              </div>
            ) : (
              <div
                onClick={() => setEditReps(record.key)}
                className={styles.editableDiv}
              >
                {record.reps || t("clickToEdit")}
              </div>
            )
          ) : (
            <div className={styles.editableDiv}>{record.reps}</div>
          ),
      },
    ];

    return (
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#1A1A1A",
              headerColor: "#ffffff",
              colorBgContainer: "#282828",
              borderColor: "#535353",
            },
          },
        }}
      >
        <Table
          rowKey={(record) => record.key}
          columns={columns}
          dataSource={data}
          pagination={false}
          className={styles.table}
          locale={{ emptyText: <EmptyBox /> }}
        />
      </ConfigProvider>
    );
  }
);
