import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current >= dayjs().endOf("day");
};
