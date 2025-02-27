import React, { useState } from "react";
import { Input } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { SubTitle } from "components/SubTitle/SubTitle";
import { CustomButton } from "components/CustomButton/CustomButton";
import { DoubleRightOutlined, SyncOutlined } from "@ant-design/icons";
import { ResetButton } from "components/ResetButton/ResetButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./WaterCalculator.module.scss";

export const WaterCalculator: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [result] = useState<number>(0);

  // male - 37.5ml / 1kg
  // female - 32.5ml / 1kg

  const handleReset = () => {
    setWeight("");
    setGender("male");
    ClosableMessage({ type: "success", content: t("reseted") });
  };

  const handleChange = (e: { target: { value: string } }) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    const numericValue = parseFloat(value);

    if (numericValue > 1000) {
      ClosableMessage({
        type: "warning",
        content: t("noMoreThan1000kg"),
      });
    } else if (!isNaN(numericValue) && /^\d*\.?\d*$/.test(value)) {
      setWeight(value);
    } else {
      setWeight("");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      className={styles.container}
    >
      <SubTitle children={t("waterCalcTitle")} className={styles.header} />
      <h3 className={styles.info}>{t("waterCalcSubTitle")}</h3>
      <div className={styles.form}>
        <div>
          <h4 className={styles.subtitle}>{t("yourWeight")}</h4>
          <Input
            className={styles.input}
            allowClear
            placeholder={t("weightKg")}
            value={weight}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.,]?[0-9]*"
            onChange={handleChange}
          />
        </div>
        <div>
          <h4 className={styles.subtitle}>{t("yourGender")}</h4>
          <div className={styles.gender}>
            <div
              className={`${styles.male} ${
                gender === "male" ? styles.active : ""
              }`}
              onClick={() => setGender("male")}
            >
              {t("male")}
            </div>
            <div
              className={`${styles.female} ${
                gender === "female" ? styles.active : ""
              }`}
              onClick={() => setGender("female")}
            >
              {t("female")}
            </div>
          </div>
        </div>
        <CustomButton
          children={t("calculate")}
          className={styles.calculate}
          icon={<DoubleRightOutlined />}
        />
      </div>
      <div className={styles.result}>
        <h4>{t("waterCalcResult")}</h4>
        <h4 className={styles.resultCount}>
          {result} {t("l")}
        </h4>
      </div>
      <ResetButton
        className={styles.resetBtn}
        children={t("reset")}
        onClick={handleReset}
        icon={<SyncOutlined />}
      />
    </motion.div>
  );
};
