import React from "react";
import { Card, Typography } from "antd";
import { animated, useSpring } from "@react-spring/web";

import { useAnimationObserver } from "../../hooks/useAnimationObserver";

import styles from "./AboutCard.module.scss";

interface AboutCardProps {
  title: string;
  text: string;
  image: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({ title, text, image }) => {
  const { isVisible, ref } = useAnimationObserver();

  const topImgAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(10rem)",
    delay: 1000,
  });

  return (
    <animated.div ref={ref} style={topImgAnimation}>
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
        <p className={styles.cardText}>{text}</p>
      </Card>
    </animated.div>
  );
};
