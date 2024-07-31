import { DownOutlined } from "@ant-design/icons";
import { ConfigProvider, Dropdown, Typography, Space, MenuProps } from "antd";
import React from "react";

import styles from "../CustomHeader.module.scss";
import { ThemeDropdownPropsType } from "../../../types/types";

export const ThemeDropdown: React.FC<ThemeDropdownPropsType> = ({
  handleThemeClick,
  themeItems,
  theme,
}) => {
  const items: MenuProps["items"] =
    themeItems?.map((item) => ({
      key: item.key,
      label: (
        <>
          <span className={styles.themeIcon}>{item.icon}</span>
          <span
            className={styles.dropdownItem}
            onClick={() => alert("Light theme in progress")}
          >
            {item.label}
          </span>
        </>
      ),
      onClick: handleThemeClick,
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
          onClick: handleThemeClick,
        }}
        arrow
      >
        <Typography.Link className={styles.settingsBtn}>
          <Space className={styles.theme}>
            {theme}
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </ConfigProvider>
  );
};
