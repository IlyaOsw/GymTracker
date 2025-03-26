import React from "react";
import { useTranslation } from "react-i18next";
import { AboutCard } from "components/AboutCard/AboutCard";
import { useSelector } from "react-redux";
import { ICard } from "types/cards";

import styles from "./CustomCard.module.scss";

export const CustomCard: React.FC = () => {
  const { t } = useTranslation();
  const cards = useSelector((state: { cards: ICard[] }) => state.cards);

  const cardClassNames: Record<number, string> = {
    2: styles.secondCard,
    4: styles.fourthCard,
  };

  return (
    <div className={styles.wrapper}>
      {[0, 2].map((startIndex) => (
        <div key={startIndex} className={styles.block}>
          {cards
            .slice(startIndex, startIndex + 2)
            .map(({ id, title, text, image }) => (
              <div
                key={id}
                className={`${styles.card} ${cardClassNames[id] || ""}`.trim()}
              >
                <AboutCard
                  title={t(title)}
                  text={t(text)}
                  image={process.env.PUBLIC_URL + image}
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
