import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { IDescriptionTitleAndText } from "types/components/description-title-text";

import styles from "./DescriptionText.module.scss";

export const DescriptionText: React.FC<IDescriptionTitleAndText> = ({
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
      variants={animation}
    >
      {t(text)}
    </motion.h2>
  );
};
