import React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "antd";

import { DescriptionTitle } from "../../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../../components/DescriptionText/DescriptionText";

import styles from "./InsideLook.module.scss";

export const InsideLook: React.FC = () => {
  const { t } = useTranslation();

  const content = [
    {
      description: t("inside1row"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Profile.png",
    },
    {
      description: t("inside2row"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/DGC.png",
    },
    {
      description: t("inside3row"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Workout1.png",
    },
    {
      description: t("inside4row"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Workout2.png",
    },
  ];

  return (
    <div className={styles.container}>
      <DescriptionTitle text={t("insideLook")} textAlign="center" />
      <DescriptionText text={t("insideLookDescription")} textAlign="center" />
      {content.map((item, index) => (
        <div
          key={index}
          className={`${styles.row} ${index % 2 !== 0 ? styles.reverse : ""}`}
        >
          <div className={styles.description}>
            <p>{item.description}</p>
          </div>
          <Image
            src={item.image}
            preview={{
              mask: t("clickToPreview"),
            }}
          />
        </div>
      ))}
    </div>
  );
};
