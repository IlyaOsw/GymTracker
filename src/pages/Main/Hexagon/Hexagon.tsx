import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Hexagon.module.scss";

export const Hexagon: React.FC = () => {
  const { t } = useTranslation();
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.block}>
      <div className={styles.imageContainer}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Hexagon/Hexagon.svg"}
          alt="Hexagon"
          className={styles.hexagon}
        />
        <div className={styles.imageText}>{t("register")}</div>
      </div>
      {screenWidth > 992 ? (
        <img
          src={
            process.env.PUBLIC_URL + "/assets/Icons/Hexagon/LineHorizontal.svg"
          }
          alt="Line"
          className={styles.lineHorizontal}
        />
      ) : (
        <img
          src={
            process.env.PUBLIC_URL + "/assets/Icons/Hexagon/LineVertical.svg"
          }
          alt="Line"
          className={styles.lineVertical}
        />
      )}
      <div className={styles.imageContainer}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Hexagon/Hexagon.svg"}
          alt="Hexagon"
          className={styles.hexagon}
        />
        <div className={styles.imageText}>{t("track")}</div>
      </div>
      {screenWidth > 992 ? (
        <img
          src={
            process.env.PUBLIC_URL + "/assets/Icons/Hexagon/LineHorizontal.svg"
          }
          alt="Line"
          className={styles.lineHorizontal}
        />
      ) : (
        <img
          src={
            process.env.PUBLIC_URL + "/assets/Icons/Hexagon/LineVertical.svg"
          }
          alt="Line"
          className={styles.lineVertical}
        />
      )}
      <div className={styles.imageContainer}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Hexagon/Hexagon.svg"}
          alt="Hexagon"
          className={styles.hexagon}
        />
        <div className={styles.imageText}>{t("result")}</div>
      </div>
    </div>
  );
};
