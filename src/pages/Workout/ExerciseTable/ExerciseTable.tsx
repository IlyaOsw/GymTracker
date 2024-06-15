import React, { useState } from "react";
import { ConfigProvider, Divider, Empty, Table, Tooltip } from "antd";
import {
  CheckOutlined,
  CloseCircleOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
    icon: <CloseCircleOutlined className={styles.deleteIcon} />,
  },
  {
    key: "2",
    weight: 80,
    set: 2,
    reps: 8,
    icon: <CloseCircleOutlined className={styles.deleteIcon} />,
  },
  {
    key: "3",
    weight: 100,
    set: 3,
    reps: 6,
    icon: <CloseCircleOutlined className={styles.deleteIcon} />,
  },
  {
    key: "4",
    weight: 110,
    set: 4,
    reps: 3,
    icon: <CloseCircleOutlined className={styles.deleteIcon} />,
  },
];

export const ExerciseTable: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ExerciseTableType[]>(initialData);

  const addRow = () => {
    const newData = [...data];
    let lastKey = 0;
    if (newData.length > 0) {
      lastKey = parseInt(newData[newData.length - 1].key);
    }
    const newRow: ExerciseTableType = {
      key: (lastKey + 1).toString(),
      weight: 0,
      set: lastKey + 1,
      reps: 0,
      icon: <CloseCircleOutlined />,
    };
    newData.push(newRow);
    setData(newData);
  };

  const deleteRow = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const customEmpty = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span style={{ color: "#ffffff" }}>{t("noData")}</span>}
    />
  );

  const columns: TableColumnsType<ExerciseTableType> = [
    {
      title: `${t("set")}`,
      dataIndex: "set",
      sorter: (a, b) => a.set - b.set,
      width: "30%",
    },
    {
      title: `${t("weight")}`,
      dataIndex: "weight",
      width: "40%",
    },
    {
      title: `${t("reps")}`,
      dataIndex: "reps",
      width: "30%",
    },
    {
      title: "",
      dataIndex: "icon",
      render: (_, record) => (
        <Tooltip title={t("deleteRow")}>
          <CloseCircleOutlined
            className={styles.deleteIcon}
            onClick={() => deleteRow(record.key)}
          />
        </Tooltip>
      ),
    },
  ];
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
              fontWeightStrong: 700,
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
        <CustomButton
          onClick={addRow}
          icon={<PlusOutlined />}
          children={t("addRow")}
        />
        <div className={styles.tableFooter}>
          <CustomButton icon={<LeftOutlined />} children={t("previous")} />
          <CustomButton icon={<CheckOutlined />} children={t("save")} />
        </div>
      </ConfigProvider>
    </>
  );
};
