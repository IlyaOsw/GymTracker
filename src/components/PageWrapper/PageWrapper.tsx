import React from "react";

import { IPageWrapperProps } from "../../types/components/page-wrapper";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

export const PageWrapper: React.FC<IPageWrapperProps> = ({ children }) => {
  return <div style={container}>{children}</div>;
};
