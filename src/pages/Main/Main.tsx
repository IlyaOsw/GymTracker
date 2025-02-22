import React, { useEffect } from "react";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { scrollToTop } from "utils/scrollToTop";

import { Greeting } from "./Greeting/Greeting";
import { MainImage } from "./MainImage/MainImage";
import { Offer } from "./Offer/Offer";
import { InsideLook } from "./InsideLook/InsideLook";

const Main: React.FC = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <MainImage />
      <PageWrapper>
        <Greeting />
        <Offer />
        <InsideLook />
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default Main;
