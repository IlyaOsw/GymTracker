import { DownOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, Typography, Space, MenuProps } from "antd";
import React from "react";

import styles from "../CustomHeader.module.scss";
import { LanguageDropdownPropsType } from "../../../types/types";

export const LanguageDropdown: React.FC<LanguageDropdownPropsType> = ({
  handleLanguageClick,
  languageItems,
  language,
  changeLanguage,
}) => {
  const items: MenuProps["items"] =
    languageItems?.map((item) => ({
      key: item.key,
      label: (
        <div className={styles.lngIcons}>
          <span>{item.icon}</span>
          <span className={styles.dropdownItem}>{item.label}</span>
        </div>
      ),
      onClick: () => changeLanguage(item.label),
    })) || [];

  return (
    <ConfigProvider
      theme={{
        token: {
          controlItemBgActiveHover: "#ffffff",
          controlItemBgActive: "#ffffff",
          colorPrimary: "#0097b2",
        },
      }}
    >
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ["1"],
          onClick: handleLanguageClick,
        }}
      >
        <Typography.Link className={styles.settingsBtn}>
          <Space className={styles.theme}>
            {language}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </ConfigProvider>
  );
};
