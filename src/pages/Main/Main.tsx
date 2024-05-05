import React, { useEffect } from "react";

import { Hexagon } from "../../components/Hexagon/Hexagon";
import { FooterImage } from "../../components/FooterImage/FooterImage";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { Greeting } from "./Greeting/Greeting";
import { MainImage } from "./MainImage/MainImage";
import { Offer } from "./Offer/Offer";

const Main: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <MainImage />
      <PageWrapper>
        <Greeting />
        <Hexagon />
        <Offer />
      </PageWrapper>
      <FooterImage />
    </>
  );
};

export default Main;
