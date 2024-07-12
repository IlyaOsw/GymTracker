import { useState } from "react";
import { Button } from "antd";

import { CustomButtonProps, SizeType } from "../../types/types";

import styles from "./CustomButton.module.scss";

export const CustomButton = ({
  children,
  icon,
  className,
  onClick,
}: CustomButtonProps) => {
  const [size] = useState<SizeType>("large");

  return (
    <Button
      icon={icon}
      size={size}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
