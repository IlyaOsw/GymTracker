import { CalendarOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker } from "antd";
import React from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { RangePickerProps } from "antd/es/date-picker";

import styles from "./Calendar.module.scss";

export const Calendar: React.FC = () => {
  const { t } = useTranslation();

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current >= dayjs().endOf("day");
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            colorBgContainer: "#141414",
            colorFillSecondary: "#141414",
            colorTextPlaceholder: "#818181",
            colorBgElevated: "#141414",
            colorTextHeading: "#ffffff",
            colorText: "#ffffff",
            colorIcon: "#ffffff",
            colorIconHover: "#1677ff",
          },
        },
      }}
    >
      <DatePicker
        className={styles.dateField}
        placeholder={t("selectDate")}
        suffixIcon={<CalendarOutlined />}
        inputReadOnly
        allowClear={false}
        disabledDate={disabledDate}
      />
    </ConfigProvider>
  );
};
