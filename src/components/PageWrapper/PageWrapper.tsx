import React from "react";

import { PageWrapperProps } from "../../types/types";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  minHeight: "100vh",
};

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div style={container}>{children}</div>;
};
