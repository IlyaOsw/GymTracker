import { CalendarOutlined } from "@ant-design/icons";
import { ConfigProvider, DatePicker } from "antd";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

import { ICalendar } from "../../types/components/calendar";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./Calendar.module.scss";

export const Calendar: React.FC<ICalendar> = ({
  className,
  value,
  onChange,
  disabledDate,
}) => {
  const { ref, controls } = useAnimatedInView();
  const { t } = useTranslation();

  const handleChange = (date: Dayjs | null) => {
    if (onChange && date) {
      onChange(date.toDate());
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
    >
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
              colorIconHover: "#0097b2",
              colorPrimary: "#0097b2",
            },
          },
        }}
      >
        <DatePicker
          format={{
            format: "DD.MM.YYYY",
            type: "mask",
          }}
          showNow={false}
          className={`${styles.dateField} ${className}`}
          value={value ? dayjs(value) : null}
          placeholder={t("selectDate")}
          suffixIcon={<CalendarOutlined />}
          onChange={handleChange}
          disabledDate={disabledDate}
        />
      </ConfigProvider>{" "}
    </motion.div>
  );
};
