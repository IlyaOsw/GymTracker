import React from "react";
import { useSpring, animated } from "@react-spring/web";

import { useAnimationObserver } from "../../../../hooks/useAnimationObserver";

import styles from "./Images.module.scss";

export const Images: React.FC = () => {
  const { isVisible, ref } = useAnimationObserver();

  const topImgAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(10rem)",
    config: { duration: 500 },
  });

  const bottomImgAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(-10rem)",
    config: { duration: 500 },
  });

  return (
    <div className={styles.images}>
      <animated.div ref={ref} style={topImgAnimation} className={styles.topImg}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Images/Main1.jpg"}
          alt="Fitness boy"
        />
      </animated.div>
      <animated.div
        ref={ref}
        style={bottomImgAnimation}
        className={styles.bottomImg}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/Images/Main2.jpg"}
          alt="Fitness girl"
        />
      </animated.div>
    </div>
  );
};
