import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div style={container}>{children}</div>;
};
