import React, { useEffect } from "react";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from "@react-spring/web";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useAnimationObserver } from "../../hooks/useAnimationObserver";

import styles from "./SignIn.module.scss";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const { isVisible, ref } = useAnimationObserver();

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(10rem)",
    from: { opacity: 0, transform: "translateY(10rem)" },
    delay: 500,
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div style={container}>
        <DescriptionTitle text={t("signIn")} textAlign="center" />
        <animated.div ref={ref} style={animationProps} className={styles.form}>
          <CustomInput text={t("email")} />
          <CustomInput text={t("password")} type="password" />
          <div className={styles.options}>
            <Checkbox className={styles.checkboxRemember}>
              {t("rememberMe")}
            </Checkbox>
            <div className={styles.importantOption}>{t("forgotPassword")}</div>
          </div>
          <Link to="/profile">
            <CustomButton className={styles.signInBtn}>
              {t("signIn")}
            </CustomButton>
          </Link>
          <div className={styles.options}>
            <div className={styles.notRegistered}>{t("notRegistered")}</div>
            <Link to="/signup">
              <div className={styles.importantOption}>
                {t("createAnAccount")}
              </div>
            </Link>
          </div>
        </animated.div>
      </div>
      <FooterImage />
    </>
  );
};

export default SignIn;
