import React from "react";
import { Link } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";

import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";

import { useAnimationObserver } from "../../../hooks/useAnimationObserver";

import styles from "./MainImage.module.scss";

export const MainImage: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible, ref } = useAnimationObserver();

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    marginTop: isVisible ? "0px" : "margitTop100px",
    from: { opacity: 0, marginTop: "100px" },
    delay: 1000,
  });

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.mainImage}
        src={process.env.PUBLIC_URL + "/assets/Images/MainImage.jpg"}
        alt="Logo"
      />
      <animated.div ref={ref} style={animationProps} className={styles.title}>
        {t("title1")} <br /> {t("title2")}
      </animated.div>
      <animated.div ref={ref} style={animationProps} className={styles.buttons}>
        <Link to={"/signup"}>
          <CustomButton className={styles.joinBtn}>
            {t("joinToday")}
          </CustomButton>
        </Link>
        <img
          className={styles.downloadImage}
          src={process.env.PUBLIC_URL + "/assets/Images/DownloadOnApp.png"}
          alt="Download"
        />
      </animated.div>
    </div>
  );
};
