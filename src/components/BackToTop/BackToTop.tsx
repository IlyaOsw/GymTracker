import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { scrollToTop } from "utils/scrollToTop";

import styles from "./BackToTop.module.scss";

export const BackToTop: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const toggle = (): void => {
      if (window.scrollY > 300) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    };

    window.addEventListener("scroll", toggle);

    return () => {
      window.removeEventListener("scroll", toggle);
    };
  }, []);

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
