import React from "react";
import { Layout } from "antd";
import { FloatButton } from "antd";

import { Routing } from "../../routes/Routing";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  color: "#fff",
  position: "relative",
  backgroundColor: "#141414",
};

export const CustomContent: React.FC = () => {
  return (
    <Content style={contentStyle}>
      <Routing />
      <FloatButton.BackTop />
    </Content>
  );
};
