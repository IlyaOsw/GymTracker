import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./DescriptionText.module.scss";

interface CustomButtonProps {
  text: string;
  textAlign?: "start" | "center" | "end";
}

export const DescriptionText: React.FC<CustomButtonProps> = ({
  text,
  textAlign = "start",
}) => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  return (
    <motion.h2
      ref={ref}
      className={`${styles.descriptionText} ${styles[textAlign]}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {t(text)}
    </motion.h2>
  );
};
