import React from "react";
import { useTranslation } from "react-i18next";

import { DescriptionTitle } from "../../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../../components/DescriptionText/DescriptionText";

import styles from "./InsideLook.module.scss";

export const InsideLook: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <DescriptionTitle text={t("InsideLook")} textAlign="center" />
      <DescriptionText
        text={t(
          "We offer a behind-the-scenes look at the app, revealing its functionality and interface through visual and textual descriptions"
        )}
        textAlign="center"
      />
      {[
        {
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias, iusto debitis repellendus eos corporis ipsam illum fuga, qui alias nesciunt obcaecati itaque, fugit amet in aut nisiLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias",
          image: (
            <img
              src={
                process.env.PUBLIC_URL + "/assets/Images/InsideLook/Profile.png"
              }
              alt=""
            />
          ),
        },
        {
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias, iusto debitis repellendus eos corporis ipsam illum fuga, qui alias nesciunt obcaecati itaque, fugit amet in aut nisiLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias",
          image: (
            <img
              src={process.env.PUBLIC_URL + "/assets/Images/InsideLook/DGC.png"}
              alt=""
            />
          ),
        },
        {
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias, iusto debitis repellendus eos corporis ipsam illum fuga, qui alias nesciunt obcaecati itaque, fugit amet in aut nisiLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias",
          image: (
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/Images/InsideLook/Workout1.png"
              }
              alt=""
            />
          ),
        },
        {
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias, iusto debitis repellendus eos corporis ipsam illum fuga, qui alias nesciunt obcaecati itaque, fugit amet in aut nisiLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempora atque molestias",
          image: (
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/Images/InsideLook/Workout2.png"
              }
              alt=""
            />
          ),
        },
      ].map((item, index) => (
        <div
          key={index}
          className={`${styles.row} ${index % 2 !== 0 ? styles.reverse : ""}`}
        >
          <div className={styles.description}>{item.description}</div>
          <div className={styles.image}>{item.image}</div>
        </div>
      ))}
    </div>
  );
};
