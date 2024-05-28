import React from "react";
import { motion } from "framer-motion";

import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";
import { SubTitleType } from "../../types/types";

import styles from "./SubTitle.module.scss";

export const SubTitle: React.FC<SubTitleType> = ({ children, className }) => {
  const { ref, controls } = useAnimatedInView();
  return (
    <motion.p
      ref={ref}
      className={`${styles.subTitle} ${className}`}
      initial="hidden"
      animate={controls}
      variants={animation}
    >
      {children}
    </motion.p>
  );
};
