import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";
import { IDescriptionTitleAndText } from "../../types/components/description-title-text";

import styles from "./DescriptionTitle.module.scss";

export const DescriptionTitle: React.FC<IDescriptionTitleAndText> = ({
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
