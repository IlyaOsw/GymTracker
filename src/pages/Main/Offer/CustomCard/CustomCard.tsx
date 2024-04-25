import React from "react";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from "@react-spring/web";

import { AboutCard } from "../../../../components/AboutCard/AboutCard";
import { useAnimationObserver } from "../../../../hooks/useAnimationObserver";

import styles from "./CustomCard.module.scss";

export const CustomCard: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible, ref } = useAnimationObserver();

  const topImgAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(8rem)",
    config: { duration: 750 },
  });

  const bottomImgAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(-8rem)",
    config: { duration: 750 },
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.upperBlock}>
        <animated.div
          ref={ref}
          style={topImgAnimation}
          className={styles.firstCard}
        >
          <AboutCard
            title={t("cardTitle1")}
            text={t("cardText1")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card1.jpg"
            }
          />
        </animated.div>
        <animated.div
          ref={ref}
          style={bottomImgAnimation}
          className={styles.secondCard}
        >
          <AboutCard
            title={t("cardTitle2")}
            text={t("cardText2")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card2.jpg"
            }
          />
        </animated.div>
      </div>
      <div className={styles.bottomBlock}>
        <animated.div
          ref={ref}
          style={topImgAnimation}
          className={styles.thirdCard}
        >
          <AboutCard
            title={t("cardTitle3")}
            text={t("cardText3")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card3.jpg"
            }
          />
        </animated.div>
        <animated.div
          ref={ref}
          style={bottomImgAnimation}
          className={styles.fourthCard}
        >
          <AboutCard
            title={t("cardTitle4")}
            text={t("cardText4")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card4.jpg"
            }
          />
        </animated.div>
      </div>
    </div>
  );
};
