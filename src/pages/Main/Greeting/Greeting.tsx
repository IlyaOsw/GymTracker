import React from "react";

import { Hexagon } from "../../../components/Hexagon/Hexagon";

import styles from "./Greeting.module.scss";
import { Images } from "./Images/Images";
import { Description } from "./Description/Description";

const imagesData = ["register", "track", "result"];

export const Greeting: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Description />
      <Images />
      <div className={`${styles.hexagonWrapper}`}>
        {imagesData.map((text, index) => (
          <React.Fragment key={index}>
            <Hexagon text={text} />
            {index < imagesData.length - 1 && (
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Icons/Hexagon/LineHorizontal.svg"
                }
                alt="Line"
                className={styles.lineHorizontal}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
