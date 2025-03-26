import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import i18n from "i18n";
import { useResponsive } from "hooks/useResponsive";
import { IMenuItem } from "types/menu-item";
import { useSelector } from "react-redux";

import styles from "./CustomHeader.module.scss";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Navbar } from "./Navbar/Navbar";

const { Header } = Layout;

export const CustomHeader: React.FC = React.memo(() => {
  const { isMobile, logoSrc } = useResponsive(992);
  const languageState = useSelector(
    (state: { language: IMenuItem[] }) => state.language
  );
  const [language, setLanguage] = useState<string>("EN");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    i18n.changeLanguage("EN");
  }, []);

  const handleLanguageClick = ({ key }: { key: string }) => {
    const selectedLanguage = languageState.find((item) => item.key === key);
    if (selectedLanguage) {
      setLanguage(selectedLanguage.label);
    }
  };

  const changeLanguage = (language: string) => i18n.changeLanguage(language);

  return (
    <Header className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        <img src={logoSrc} alt="Gym Tracker" />
      </Link>
      {isMobile ? (
        <Button className={styles.burgerBtn} onClick={() => setOpen(true)}>
          <MenuOutlined style={{ color: "#fff" }} />
        </Button>
      ) : (
        <Navbar
          handleLanguageClick={handleLanguageClick}
          languageState={languageState}
          language={language}
          changeLanguage={changeLanguage}
        />
      )}
      <BurgerMenu
        open={open}
        setOpen={setOpen}
        language={language}
        handleLanguageClick={handleLanguageClick}
        languageState={languageState}
        changeLanguage={changeLanguage}
      />
    </Header>
  );
});
