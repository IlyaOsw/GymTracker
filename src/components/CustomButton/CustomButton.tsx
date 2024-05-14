import { useState } from "react";
import { Button } from "antd";

import styles from "./CustomButton.module.scss";

import type { ConfigProviderProps } from "antd";

type SizeType = ConfigProviderProps["componentSize"];

interface CustomButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CustomButton = ({
  children,
  icon,
  className,
  onClick,
}: CustomButtonProps) => {
  const [size] = useState<SizeType>("large");

  return (
    <Button
      type="primary"
      shape="round"
      icon={icon}
      size={size}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};