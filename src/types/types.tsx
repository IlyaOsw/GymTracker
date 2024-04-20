export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export type HeaderPropsType = {
  setVisible?: (visible: boolean) => void;
  visible?: boolean;
  theme?: string;
  handleThemeClick?: ({ key }: { key: string }) => void;
  themeItems?: MenuItem[];
  language?: string;
  handleLanguageClick?: ({ key }: { key: string }) => void;
  languageItems?: MenuItem[];
};
