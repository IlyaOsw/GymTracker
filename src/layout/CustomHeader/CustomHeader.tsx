import React, { useState } from "react";
import { Layout, Button } from "antd";
import { MenuOutlined, MoonFilled, SunOutlined } from "@ant-design/icons";

import { MenuItem } from "../../types/types";
import i18n from "../../i18n";
import { useResponsive } from "../../hooks/useResponsive";

import styles from "./CustomHeader.module.scss";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { Navbar } from "./Navbar/Navbar";

const { Header } = Layout;

export const CustomHeader: React.FC = React.memo(() => {
  const { isMobile, logoSrc } = useResponsive(992);
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

  const changeLanguage = (language: string) => i18n.changeLanguage(language);

  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <img src={logoSrc} alt="Gym Tracker Logo" />
      </div>
      {isMobile ? (
        <Button className={styles.burgerBtn} onClick={() => setOpen(true)}>
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
});

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
    label: "EN",
    icon: (
      <img
        src={
          process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/En.png"
        }
        alt="Eng"
        style={{ width: "25px", height: "25px", marginRight: "10px" }}
      />
    ),
  },
  {
    key: "2",
    label: "RU",
    icon: (
      <img
        src={
          process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/Ru.png"
        }
        alt="Rus"
        style={{ width: "25px", height: "25px", marginRight: "10px" }}
      />
    ),
  },
  {
    key: "3",
    label: "EE",
    icon: (
      <img
        src={
          process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/Ee.png"
        }
        alt="Ee"
        style={{ width: "25px", height: "25px", marginRight: "10px" }}
      />
    ),
  },
];
