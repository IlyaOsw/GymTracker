import React, { useEffect } from "react";
import { Divider } from "antd";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { UserProvider } from "context/UserContext";

import { Diary } from "./Diary/Diary";
import { Calculator } from "./Calculator/Calculator";
import { Information } from "./Information/Information";
import { Goal } from "./Goal/Goal";

const Profile: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <UserProvider>
      <PageWrapper>
        <Information />
        <Diary />
        <Goal />
        <Divider style={{ backgroundColor: "gray" }} />
        <Calculator />
      </PageWrapper>
    </UserProvider>
  );
};

export default Profile;
