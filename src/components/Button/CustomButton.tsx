import { useState } from "react";
import { Button } from "antd";

import type { ConfigProviderProps } from "antd";

type SizeType = ConfigProviderProps["componentSize"];

interface CustomButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const CustomButton = ({
  children,
  icon,
  className,
}: CustomButtonProps) => {
  const [size] = useState<SizeType>("large");

  return (
    <Button
      type="primary"
      shape="round"
      icon={icon}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
};
