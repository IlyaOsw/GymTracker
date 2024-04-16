import React from "react";
import { useTranslation } from "react-i18next";

import i18n from "./i18n";

const App: React.FC = () => {
  const { t } = useTranslation();

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      {t("hello")}
      <button onClick={() => changeLanguage("ru")}>RUS</button>
      <button onClick={() => changeLanguage("en")}>ENG</button>
    </div>
  );
};

export default App;
