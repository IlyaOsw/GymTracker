import React from "react";

import { DescriptionTitle } from "../../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../../components/DescriptionText/DescriptionText";

import { CustomCard } from "./CustomCard/CustomCard";

export const Offer: React.FC = () => {
  return (
    <div>
      <DescriptionTitle text={"What we offer"} textAlign="center" />
      <DescriptionText
        text={"We're committed to bringing you the best workout experience."}
        textAlign="center"
      />
      <CustomCard />
    </div>
  );
};
