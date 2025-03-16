import React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "components/DescriptionText/DescriptionText";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { InsideLookType } from "types/store/inside-look";

import styles from "./InsideLook.module.scss";

export const InsideLook: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const insideLook = useSelector(
    (state: { insideLook: InsideLookType[] }) => state.insideLook
  );

  return (
    <div className={styles.container}>
      <DescriptionTitle text={t("insideLook")} textAlign="center" />
      <DescriptionText text={t("insideLookDescription")} textAlign="center" />
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animation}
      >
        {insideLook.map((item, index) => (
          <div
            key={index}
            className={`${styles.row} ${index % 2 !== 0 ? styles.reverse : ""}`}
          >
            <div className={styles.info}>
              <h2 className={styles.title}>{t(item.title)}</h2>
              <h3 className={styles.description}>{t(item.description)}</h3>
            </div>
            <Image.PreviewGroup
              items={[
                process.env.PUBLIC_URL +
                  "/assets/Images/InsideLook/Profile.png",
                process.env.PUBLIC_URL + "/assets/Images/InsideLook/DGC.png",
                process.env.PUBLIC_URL +
                  "/assets/Images/InsideLook/Workout1.png",
                process.env.PUBLIC_URL +
                  "/assets/Images/InsideLook/Workout2.png",
              ]}
            >
              <Image
                src={item.image}
                preview={{
                  mask: (
                    <div className={styles.mask}>
                      <EyeOutlined />
                      <span>{t("show")} </span>
                    </div>
                  ),
                  maskClassName: styles.maskClass,
                }}
              />
            </Image.PreviewGroup>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
