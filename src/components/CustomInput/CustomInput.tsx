import { Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from "@react-spring/web";

import { useAnimationObserver } from "../../hooks/useAnimationObserver";

import styles from "./CustomInput.module.scss";

interface CustomInputProps {
  text: string;
  type?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ text, type }) => {
  const { t } = useTranslation();
  const { isVisible, ref } = useAnimationObserver();

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(10rem)",
    from: { opacity: 0, transform: "translateY(10rem)" },
    delay: 500,
  });

  return (
    <animated.div
      ref={ref}
      style={animationProps}
      className={styles.inputWrapper}
    >
      <p className={styles.inputLabel}>{t(text)}</p>
      <Input type={type} placeholder={text} className={styles.inputField} />
    </animated.div>
  );
};
