import React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { DescriptionTitle } from "../../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../../components/DescriptionText/DescriptionText";

import styles from "./InsideLook.module.scss";

export const InsideLook: React.FC = () => {
  const { t } = useTranslation();

  const content = [
    {
      title: t("inside1title"),
      description: t("inside1desc"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Profile.png",
    },
    {
      title: t("inside2title"),
      description: t("inside2desc"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/DGC.png",
    },
    {
      title: t("inside3title"),
      description: t("inside3desc"),
      image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Workout1.png",
    },
    {
      title: t("inside4title"),
      description: t("inside4desc"),
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
          <div className={styles.info}>
            <h2 className={styles.title}>{item.title}</h2>
            <h4 className={styles.description}>{item.description}</h4>
          </div>
          <Image
            src={item.image}
            preview={{
              mask: (
                <div className={styles.mask}>
                  <EyeOutlined />
                  <span>{t("show")} </span>
                </div>
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
};
