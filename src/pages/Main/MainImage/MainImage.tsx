import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import styles from "./MainImage.module.scss";

export const MainImage: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}></div>
      <div className={styles.title}>
        <motion.p
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={animation}
        >
          {t("title1")} <br /> {t("title2")}
        </motion.p>
      </div>
      <div className={styles.buttons}>
        <Link to={"/signup"}>
          <CustomButton className={styles.joinBtn}>
            {t("joinToday")}
          </CustomButton>
        </Link>
        <div className={styles.downloadImage}>
          <div>{t("comingSoon")}</div>
          <Link to="https://www.apple.com/app-store/" target="_blank">
            <img
              src={process.env.PUBLIC_URL + "/assets/Images/DownloadOnApp.png"}
              alt="Download"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
