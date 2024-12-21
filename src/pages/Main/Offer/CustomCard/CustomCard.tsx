import React from "react";
import { useTranslation } from "react-i18next";

import { AboutCard } from "../../../../components/AboutCard/AboutCard";

import styles from "./CustomCard.module.scss";

export const CustomCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div className={`${styles.card}`}>
          <AboutCard
            title={t("cardTitle1")}
            text={t("cardText1")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card1.jpg"
            }
          />
        </div>
        <div className={`${styles.secondCard} ${styles.card}`}>
          <AboutCard
            title={t("cardTitle2")}
            text={t("cardText2")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card2.jpg"
            }
          />
        </div>
      </div>
      <div className={styles.block}>
        <div className={`${styles.card}`}>
          <AboutCard
            title={t("cardTitle3")}
            text={t("cardText3")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card3.jpg"
            }
          />
        </div>
        <div className={`${styles.fourthCard} ${styles.card}`}>
          <AboutCard
            title={t("cardTitle4")}
            text={t("cardText4")}
            image={
              process.env.PUBLIC_URL + "/assets/Images/MainCards/Card4.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
};
