import React from "react";
import { Card, Typography } from "antd";

import styles from "./AboutCard.module.scss";

interface AboutCardProps {
  title: string;
  text: string;
  image: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({ title, text, image }) => {
  return (
    <Card
      className={styles.card}
      title={
        <Typography.Title level={4} style={{ color: "#ffffff" }}>
          {title}
        </Typography.Title>
      }
      cover={<img alt="Card" src={image} />}
    >
      <p className={styles.cardText}>{text}</p>
    </Card>
  );
};
