import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#141414",
};

export const CustomFooter: React.FC = () => {
  return <Footer style={footerStyle}>FOOTER</Footer>;
};
