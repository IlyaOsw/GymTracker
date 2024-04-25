import React, { useEffect } from "react";

import { Hexagon } from "../../components/Hexagon/Hexagon";

import { Greeting } from "./Greeting/Greeting";

import { MainImage } from "./MainImage/MainImage";
import { Offer } from "./Offer/Offer";

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
        <Offer />
      </div>
    </>
  );
};

export default Main;
