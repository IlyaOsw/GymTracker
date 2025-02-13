import React from "react";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";
import { IAboutCardProps } from "types/components/about-card";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";

import styles from "./AboutCard.module.scss";

export const AboutCard: React.FC<IAboutCardProps> = ({
  title,
  text,
  image,
}) => {
  const { ref, controls } = useAnimatedInView();

  return (
    <Card
      className={styles.card}
      styles={{ header: { border: "none" } }}
      title={
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={animation}
        >
          <Typography.Title level={4} style={{ color: "#0097b2" }}>
            {title}
          </Typography.Title>
        </motion.div>
      }
      cover={<img alt="Card" src={image} />}
    >
      <motion.p
        ref={ref}
        className={styles.cardText}
        initial="hidden"
        animate={controls}
        variants={animation}
      >
        {text}
      </motion.p>
    </Card>
  );
};
