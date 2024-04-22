import React, { useEffect } from "react";

const SignIn: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div style={{ height: "80vh", backgroundColor: "#141414" }}>
      <h1>SIGN IN PAGE</h1>
    </div>
  );
};

export default SignIn;
