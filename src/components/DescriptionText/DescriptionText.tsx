import React from "react";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from "@react-spring/web";

import { useAnimationObserver } from "../../hooks/useAnimationObserver";

import styles from "./DescriptionText.module.scss";

interface CustomButtonProps {
  text: string;
  textAlign?: "start" | "center" | "end";
}

export const DescriptionText: React.FC<CustomButtonProps> = ({
  text,
  textAlign = "start",
}) => {
  const { t } = useTranslation();
  const { isVisible, ref } = useAnimationObserver();

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(8rem)",
    from: { opacity: 0, transform: "translateY(8rem)" },
    delay: 750,
  });

  return (
    <animated.h2
      ref={ref}
      style={animationProps}
      className={`${styles.descriptionText} ${styles[textAlign]}`}
    >
      {t(text)}
    </animated.h2>
  );
};
