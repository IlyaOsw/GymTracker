import React, { useEffect } from "react";

import { Greeting } from "./Greeting/Greeting";
import { Hexagon } from "./Hexagon/Hexagon";
import { MainImage } from "./MainImage/MainImage";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const Main: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <MainImage />
      <div style={container}>
        <Greeting />
        <Hexagon />
      </div>
    </>
  );
};

export default Main;
