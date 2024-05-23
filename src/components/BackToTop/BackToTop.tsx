import React, { useState } from "react";
import { Button } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";

import styles from "./BackToTop.module.scss";

export const BackToTop: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = (): void => {
    if (window.scrollY > 300) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };
  window.addEventListener("scroll", toggle);

  return (
    <Button
      type="primary"
      size="large"
      shape="circle"
      icon={<VerticalAlignTopOutlined />}
      className={`${styles.scrollBtn} ${isHidden ? `${styles.hidden}` : ""}`}
      onClick={scrollToTop}
    />
  );
};
