import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";

import styles from "./BMICollapse.module.scss";

export const BMICollapse: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  const getItems: () => CollapseProps["items"] = () => [
    {
      key: "1",
      label: <h4 className={styles.collapseTitle}>{t("BMIOverview")}</h4>,
      children: (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={animation}
          className={styles.collapseInfo}
        >
          <div>
            <p>
              {"< 16.0 — "} {t("severeUnderweight")}
            </p>
            <p>16.0– 16.9 — {t("underweight")}</p>
            <p>17.0–18.4 — {t("mildUnderweight")}</p>
            <p>18.5–24.9 — {t("normalWeight")}</p>
          </div>
          <div>
            <p>25.0–29.9 — {t("overweight")}</p>
            <p>30.0–34.9 — {t("obesity1")}</p>
            <p>35.0–39.9 — {t("obesity2")}</p>
            <p>≥ 40.0 — {t("obesity3")}</p>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <Collapse
      bordered={false}
      className={styles.collapse}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      items={getItems()}
    />
  );
};
