import React from "react";
import { motion } from "framer-motion";

import { Hexagon } from "../../../components/Hexagon/Hexagon";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import styles from "./Greeting.module.scss";
import { Images } from "./Images/Images";
import { Description } from "./Description/Description";

const imagesData = ["register", "track", "result"];

export const Greeting: React.FC = () => {
  const { ref, controls } = useAnimatedInView();

  return (
    <div className={styles.wrapper}>
      <Description />
      <Images />
      <motion.div
        ref={ref}
        className={styles.hexagonWrapper}
        initial="hidden"
        animate={controls}
        variants={animation}
      >
        {imagesData.map((text, index) => (
          <React.Fragment key={index}>
            <Hexagon text={text} />
            {index < imagesData.length - 1 && (
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Icons/Hexagon/LineHorizontal.svg"
                }
                alt="Line"
                className={styles.lineHorizontal}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
