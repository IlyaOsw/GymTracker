import React from "react";
import { useTranslation } from "react-i18next";

import { ImageData } from "../../../types/types";

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

  return (
    <div className={styles.block}>
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
    </div>
  );
};
