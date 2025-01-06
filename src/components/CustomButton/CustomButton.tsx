import { Button } from "antd";

import { ICustomButtonProps } from "../../types/types";

import styles from "./CustomButton.module.scss";

export const CustomButton = ({
  children,
  icon,
  className,
  onClick,
  disabled,
  htmlType,
  style,
}: ICustomButtonProps) => {
  return (
    <Button
      icon={icon}
      size="large"
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      htmlType={htmlType}
      style={style}
    >
      {children}
    </Button>
  );
};
