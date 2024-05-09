import React, { useState } from "react";
import { ConfigProvider, Divider, Table } from "antd";
import { CheckOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { ExerciseTableType } from "../../../types/types";

import styles from "./ExerciseTable.module.scss";

import type { TableColumnsType } from "antd";

const initialData: ExerciseTableType[] = [
  {
    key: "1",
    weight: 60,
    set: 1,
    reps: 10,
  },
  {
    key: "2",
    weight: 80,
    set: 2,
    reps: 8,
  },
  {
    key: "3",
    weight: 100,
    set: 3,
    reps: 6,
  },
  {
    key: "4",
    weight: 110,
    set: 4,
    reps: 3,
  },
];

export const ExerciseTable: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ExerciseTableType[]>(initialData);

  const addRow = () => {
    const newData = [...data];
    const lastKey = parseInt(newData[newData.length - 1].key.toString());
    const newRow: ExerciseTableType = {
      key: (lastKey + 1).toString(),
      weight: 0,
      set: lastKey + 1,
      reps: 0,
    };
    newData.push(newRow);
    setData(newData);
  };

  const columns: TableColumnsType<ExerciseTableType> = [
    {
      title: `${t("set")}`,
      dataIndex: "set",
      // sorter: (a, b) => a.set - b.set,
      width: "30.333%",
    },
    {
      title: `${t("weight")}`,
      dataIndex: "weight",
      width: "30.333%",
    },

    {
      title: `${t("reps")}`,
      dataIndex: "reps",
      width: "30.333%",
    },
  ];

  return (
    <>
      <Divider style={{ backgroundColor: "#0097B2" }} />
      <div className={styles.tableTitle}>
        <SubTitle children={"Bench press"} />
        <div className={styles.date}>{t("date")}02.04.2024</div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#1A1A1A",
              headerColor: "#0097B2",
              headerSortHoverBg: "#282828",
              bodySortBg: "#282828",
              cellFontSize: 20,
              colorBgContainer: "#282828",
              colorText: "#ffffff",
              colorPrimary: "#ffffff",
              headerBorderRadius: 0,
              rowHoverBg: "#464646",
              borderColor: "#0097B2",
              fontWeightStrong: 700,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className={styles.table}
        />
        <CustomButton
          onClick={addRow}
          icon={<PlusOutlined />}
          children={t("addRow")}
        />
        <div className={styles.tableFooter}>
          <CustomButton icon={<LeftOutlined />} children={t("seePrevious")} />
          <CustomButton icon={<CheckOutlined />} children={t("save")} />
        </div>
      </ConfigProvider>
    </>
  );
};
