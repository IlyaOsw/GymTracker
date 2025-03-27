import { DownOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, Typography, Space, MenuProps } from "antd";
import React from "react";
import { LanguageDropdownPropsType } from "types/language-dropdown";

import styles from "../CustomHeader.module.scss";

export const LanguageDropdown: React.FC<LanguageDropdownPropsType> = ({
  handleLanguageClick,
  languageState,
  language,
  changeLanguage,
}) => {
  const items: MenuProps["items"] =
    languageState?.map((item) => ({
      key: item.key,
      label: (
        <div className={styles.lngIcons}>
          <img
            src={item.icon as string}
            alt={item.label}
            style={{ width: "25px", height: "25px", marginRight: "10px" }}
          />
          <span className={styles.dropdownItem}>{item.label}</span>
        </div>
      ),
      onClick: () => changeLanguage(item.label),
    })) || [];

  return (
    <ConfigProvider
      theme={{
        token: {
          controlItemBgActiveHover: "#EFEFEF",
          controlItemBgActive: "#EFEFEF",
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
          <Space className={styles.language}>
            {language}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </ConfigProvider>
  );
};
