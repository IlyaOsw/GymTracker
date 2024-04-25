import React, { useEffect } from "react";

import { FooterImage } from "../../components/FooterImage/FooterImage";

const SignIn: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div style={{ height: "80vh", backgroundColor: "#141414" }}>
        <h1>SIGN IN PAGE</h1>
      </div>
      <FooterImage />
    </>
  );
};

export default SignIn;
