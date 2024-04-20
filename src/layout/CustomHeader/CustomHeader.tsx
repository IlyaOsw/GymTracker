import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { MenuOutlined, MoonFilled, SunOutlined } from "@ant-design/icons";

import { MenuItem } from "../../types/types";

import styles from "./CustomHeader.module.scss";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Navbar } from "./Navbar/Navbar";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
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
  },
  {
    key: "2",
    label: "Rus",
  },
];

const mobileLogoSrc =
  process.env.PUBLIC_URL + "/assets/logo/LogoMainMobile.png";
const desktopLogoSrc = process.env.PUBLIC_URL + "/assets/logo/LogoMain.png";

export const CustomHeader: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [logoSrc, setLogoSrc] = useState(
    isMobile ? mobileLogoSrc : desktopLogoSrc
  );
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("Eng");

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 992);
      setLogoSrc(width <= 992 ? mobileLogoSrc : desktopLogoSrc);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <Header style={headerStyle}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="Gym Tracker Logo" />
      </div>
      {isMobile ? (
        <Button className={styles.burgerBtn} onClick={showDrawer}>
          <MenuOutlined />
        </Button>
      ) : (
        <Navbar
          handleThemeClick={handleThemeClick}
          themeItems={themeItems}
          theme={theme}
          handleLanguageClick={handleLanguageClick}
          languageItems={languageItems}
          language={language}
        />
      )}
      <BurgerMenu
        setVisible={setVisible}
        visible={visible}
        theme={theme}
        handleThemeClick={handleThemeClick}
        themeItems={themeItems}
        language={language}
        handleLanguageClick={handleLanguageClick}
        languageItems={languageItems}
      />
    </Header>
  );
};
