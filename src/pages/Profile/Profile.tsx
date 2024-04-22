import React, { useEffect } from "react";

const Profile: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div style={{ height: "80vh", backgroundColor: "#141414" }}>
      <h1>PROFILE PAGE</h1>
    </div>
  );
};

export default Profile;
