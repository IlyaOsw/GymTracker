import React from "react";
import { Layout } from "antd";

import { About } from "./About/About";
import { FooterImage } from "./FooterImage/FooterImage";

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#141414",
  padding: "20px 0px",
};

export const CustomFooter: React.FC = React.memo(() => {
  return (
    <Footer style={footerStyle}>
      <FooterImage />
      <About />
    </Footer>
  );
});
