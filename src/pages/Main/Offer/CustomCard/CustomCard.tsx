import React from "react";
import { Card, Typography } from "antd";

import styles from "./CustomCard.module.scss";

export const CustomCard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Card
        className={styles.card}
        styles={{ header: { border: "none" } }}
        title={
          <Typography.Title level={4} style={{ color: "#ffffff" }}>
            Convenient workout tracking
          </Typography.Title>
        }
        cover={
          <img
            alt="Card"
            src={process.env.PUBLIC_URL + "/assets/Images/MainCards/Card1.jpg"}
          />
        }
      >
        <p className={styles.cardText}>
          Never forget your workouts with our intuitive interface. Simply input
          your exercises, duration, and intensity, and GYM TRACKER will take
          care of the rest.
        </p>
      </Card>
      <Card
        className={styles.card}
        styles={{ header: { border: "none" } }}
        title={
          <Typography.Title level={4} style={{ color: "#ffffff" }}>
            Motivation at every step
          </Typography.Title>
        }
        cover={
          <img
            alt="Card"
            src={process.env.PUBLIC_URL + "/assets/Images/MainCards/Card2.jpg"}
          />
        }
      >
        <p className={styles.cardText}>
          Receive daily reminders, motivational messages, and achievements for
          your successes. Our motivation system supports you on the path to your
          goals.
        </p>
      </Card>
      <Card
        className={styles.card}
        styles={{ header: { border: "none" } }}
        title={
          <Typography.Title level={4} style={{ color: "#ffffff" }}>
            Tracking performance
          </Typography.Title>
        }
        cover={
          <img
            alt="Card"
            src={process.env.PUBLIC_URL + "/assets/Images/MainCards/Card3.jpg"}
          />
        }
      >
        <p className={styles.cardText}>
          Track your workout metrics, including time, distance, repetitions, and
          much more. Analyze your progress and optimize your training plans.
        </p>
      </Card>
      <Card
        className={styles.card}
        styles={{ header: { border: "none" } }}
        title={
          <Typography.Title level={4} style={{ color: "#ffffff" }}>
            Goal setting and achievement
          </Typography.Title>
        }
        cover={
          <img
            alt="Card"
            src={process.env.PUBLIC_URL + "/assets/Images/MainCards/Card4.jpg"}
          />
        }
      >
        <p className={styles.cardText}>
          Set clear and measurable goals for yourself and track your progress
          towards achieving them. GYP TRACKER will assist you every step of the
          way on your path to success.
        </p>
      </Card>
    </div>
  );
};
