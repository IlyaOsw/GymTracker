import React, { useEffect } from "react";

import { Loader } from "../../components/Loader/Loader";

const Profile: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <h1>PROFILE PAGE</h1>
      <Loader />
    </div>
  );
};

export default Profile;
