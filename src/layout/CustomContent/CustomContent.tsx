import React from "react";
import { Layout } from "antd";
import { Routing } from "routes/Routing";
import { BackToTop } from "components/BackToTop/BackToTop";

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  position: "relative",
  backgroundColor: "#141414",
};

export const CustomContent: React.FC = () => {
  return (
    <Content style={contentStyle}>
      <Routing />
      <BackToTop />
    </Content>
  );
};
