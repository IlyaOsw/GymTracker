import React from "react";
import { Layout } from "antd";

import "./Layout.scss";
import { Animation } from "../components/Animation/Animation";

import { CustomHeader } from "./CustomHeader/CustomHeader";
import { CustomContent } from "./CustomContent/CustomContent";

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
};

export const CustomLayout: React.FC = () => (
  <Layout style={layoutStyle}>
    <Animation />
    <CustomHeader />
    <CustomContent />
  </Layout>
);
