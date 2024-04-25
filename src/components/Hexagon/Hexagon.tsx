import React from "react";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from "@react-spring/web";

import { ImageData } from "../../types/types";

import { useAnimationObserver } from "../../hooks/useAnimationObserver";

import styles from "./Hexagon.module.scss";

const imagesData: ImageData[] = [
  {
    src: "/assets/Icons/Hexagon/Hexagon.svg",
    alt: "Hexagon",
    text: "register",
  },
  { src: "/assets/Icons/Hexagon/Hexagon.svg", alt: "Hexagon", text: "track" },
  { src: "/assets/Icons/Hexagon/Hexagon.svg", alt: "Hexagon", text: "result" },
];

export const Hexagon: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible, ref } = useAnimationObserver();

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(4rem)",
    from: { opacity: 0, transform: "translateY(4rem)" },
    delay: 750,
  });

  return (
    <animated.div ref={ref} style={animationProps} className={styles.block}>
      {imagesData.map((data, index) => (
        <React.Fragment key={index}>
          <div className={styles.imageContainer}>
            <img
              src={process.env.PUBLIC_URL + data.src}
              alt={data.alt}
              className={styles.hexagon}
            />
            <div className={styles.imageText}>{t(data.text)}</div>
          </div>
          {index < imagesData.length - 1 && (
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/Icons/Hexagon/LineHorizontal.svg"
              }
              alt="Line"
              className={styles.lineHorizontal}
            />
          )}
        </React.Fragment>
      ))}
    </animated.div>
  );
};
