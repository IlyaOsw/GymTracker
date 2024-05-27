import React from "react";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";

import { useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./AboutCard.module.scss";

interface AboutCardProps {
  title: string;
  text: string;
  image: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({ title, text, image }) => {
  const { ref, controls } = useAnimatedInView();
  return (
    <Card
      className={styles.card}
      styles={{ header: { border: "none" } }}
      title={
        <Typography.Title level={4} style={{ color: "#ffffff" }}>
          {title}
        </Typography.Title>
      }
      cover={<img alt="Card" src={image} />}
    >
      <motion.p
        ref={ref}
        className={styles.cardText}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        {text}
      </motion.p>
    </Card>
  );
};
