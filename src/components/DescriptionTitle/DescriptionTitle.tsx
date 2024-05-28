import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";
import { CustomButtonProps } from "../../types/types";

import styles from "./DescriptionTitle.module.scss";

export const DescriptionTitle: React.FC<CustomButtonProps> = ({
  text,
  textAlign = "start",
  className,
}) => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  return (
    <motion.h2
      ref={ref}
      className={`${styles.descriptionTitle} ${styles[textAlign]} ${className}`}
      initial="hidden"
      animate={controls}
      variants={animation}
    >
      {t(text)}
    </motion.h2>
  );
};
