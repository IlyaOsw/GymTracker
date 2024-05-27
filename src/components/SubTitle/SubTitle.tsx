import React from "react";
import { motion } from "framer-motion";

import { useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./SubTitle.module.scss";

interface SubTitleType {
  children: string;
  className?: string;
}

export const SubTitle: React.FC<SubTitleType> = ({ children, className }) => {
  const { ref, controls } = useAnimatedInView();
  return (
    <motion.p
      ref={ref}
      className={`${styles.subTitle} ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.p>
  );
};
