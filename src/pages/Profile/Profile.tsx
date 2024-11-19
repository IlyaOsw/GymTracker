import React, { useEffect } from "react";

import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { UserProvider } from "../../context/UserContext";

import { Diary } from "./Diary/Diary";
import { Calculator } from "./Calculator/Calculator";
import { Information } from "./Information/Information";

const Profile: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <UserProvider>
      <PageWrapper>
        <Information />
        <Diary />
        <Calculator />
      </PageWrapper>
    </UserProvider>
  );
};

export default Profile;
