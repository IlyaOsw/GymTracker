import React, { useEffect } from "react";
import { Divider } from "antd";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { UserProvider } from "context/UserContext";

import { Diary } from "./Diary/Diary";
import { Information } from "./Information/Information";
import { Goal } from "./Goal/Goal";
import { DeleteAccount } from "./Information/DeleteAccount/DeleteAccount";

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
        <DeleteAccount />
      </PageWrapper>
    </UserProvider>
  );
};

export default Profile;
