import React, { useEffect } from "react";

const Workout: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div style={{ height: "80vh", backgroundColor: "#141414" }}>
      <h1>WORKOUT PAGE</h1>
    </div>
  );
};

export default Workout;
