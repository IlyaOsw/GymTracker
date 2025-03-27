import React from "react";
import { Layout } from "antd";

import { CustomHeader } from "./CustomHeader/CustomHeader";
import { CustomContent } from "./CustomContent/CustomContent";
import "./Layout.scss";

export const CustomLayout: React.FC = () => (
  <Layout>
    <CustomHeader />
    <CustomContent />
  </Layout>
);
