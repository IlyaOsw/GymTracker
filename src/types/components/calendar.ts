export interface ICalendar {
  className?: string;
  onChange: (value: Date) => void;
  value?: Date | null;
  disabledDate?: any;
}
