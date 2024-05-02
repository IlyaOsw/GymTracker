import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { MenuOutlined, MoonFilled, SunOutlined } from "@ant-design/icons";

import { MenuItem } from "../../types/types";

import i18n from "../../i18n";

import styles from "./CustomHeader.module.scss";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Navbar } from "./Navbar/Navbar";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  color: "#fff",
  height: 70,
  paddingInline: 40,
  lineHeight: "64px",
  backgroundColor: "#141414",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const themeItems: MenuItem[] = [
  {
    key: "1",
    label: "Dark",
    icon: <MoonFilled />,
  },
  {
    key: "2",
    label: "Light",
    icon: <SunOutlined />,
  },
];

const languageItems: MenuItem[] = [
  {
    key: "1",
    label: "Eng",
    icon: (
      <img
        src={
          process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/Eng.png"
        }
        alt="Eng"
        style={{ width: "25px", height: "25px", marginRight: "5px" }}
      />
    ),
  },
  {
    key: "2",
    label: "Rus",
    icon: (
      <img
        src={
          process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/Rus.png"
        }
        alt="Rus"
        style={{ width: "25px", height: "25px", marginRight: "5px" }}
      />
    ),
  },
];

const mobileLogoSrc =
  process.env.PUBLIC_URL + "/assets/Logo/LogoMainMobile.svg";
const desktopLogoSrc = process.env.PUBLIC_URL + "/assets/Logo/LogoMain.svg";

export const CustomHeader: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [logoSrc, setLogoSrc] = useState(
    isMobile ? mobileLogoSrc : desktopLogoSrc
  );
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("Eng");
  const [open, setOpen] = useState(false);

  const handleThemeClick = ({ key }: { key: string }) => {
    const selectedTheme = themeItems.find((item) => item.key === key);
    if (selectedTheme) {
      setTheme(selectedTheme.label);
    }
  };

  const handleLanguageClick = ({ key }: { key: string }) => {
    const selectedLanguage = languageItems.find((item) => item.key === key);
    if (selectedLanguage) {
      setLanguage(selectedLanguage.label);
    }
  };

  const showDrawer = () => setOpen(true);

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 992);
      setLogoSrc(width <= 1200 ? mobileLogoSrc : desktopLogoSrc);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  return (
    <Header style={headerStyle}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="Gym Tracker Logo" />
      </div>
      {isMobile ? (
        <Button className={styles.burgerBtn} onClick={showDrawer}>
          <MenuOutlined style={{ color: "white" }} />
        </Button>
      ) : (
        <Navbar
          handleThemeClick={handleThemeClick}
          themeItems={themeItems}
          theme={theme}
          handleLanguageClick={handleLanguageClick}
          languageItems={languageItems}
          language={language}
          changeLanguage={changeLanguage}
        />
      )}
      <BurgerMenu
        open={open}
        setOpen={setOpen}
        theme={theme}
        handleThemeClick={handleThemeClick}
        themeItems={themeItems}
        language={language}
        handleLanguageClick={handleLanguageClick}
        languageItems={languageItems}
        changeLanguage={changeLanguage}
      />
    </Header>
  );
};
