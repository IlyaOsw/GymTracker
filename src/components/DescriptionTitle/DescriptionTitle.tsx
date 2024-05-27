import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./DescriptionTitle.module.scss";

interface CustomButtonProps {
  text: string;
  textAlign?: "start" | "center" | "end";
  className?: string;
}

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
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {t(text)}
    </motion.h2>
  );
};
