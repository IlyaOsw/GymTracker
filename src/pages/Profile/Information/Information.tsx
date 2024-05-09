import React, { useState } from "react";

import {
  MessageOutlined,
  CheckOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";

import styles from "./Information.module.scss";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";

export const Information: React.FC = () => {
  const { t } = useTranslation();
  const [follow, setFollow] = useState(false);

  const handleFollow = () => {
    setFollow((prevFollow) => !prevFollow);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.paper}>
          <img
            src="https://scontent.ftll3-2.fna.fbcdn.net/v/t39.30808-6/352395583_2514703918686762_386126034353017660_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rHFhVZXsGRkQ7kNvgEaRYHt&_nc_oc=Adjc0rMMrQJLodWNt__Sc2OHF6UbvPPUYYADHl7nFfaEVUVWE4rDbFLDLiUiEjF6E0s&_nc_ht=scontent.ftll3-2.fna&oh=00_AfCIvlFneyFG9U9rJElpcAzEBm3RdrGIsKYuiezkDC9Fig&oe=663E7BF2"
            alt="Paper"
          />
        </div>
        <div className={styles.avatar}>
          <img
            src="https://scontent.ftll3-2.fna.fbcdn.net/v/t1.15752-9/441948832_1641887679945902_7689976602008975630_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eSlEon3VATkQ7kNvgF_YmOM&_nc_ht=scontent.ftll3-2.fna&oh=03_Q7cD1QGe-zsvVnR-ln-faJ4LWFjvNdBQBbnkuIbyEKaD5KYlGQ&oe=66602397"
            alt="Avatar"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.personalInformation}>
          <div>Ilja Ossipov</div>
          <div>Powerlifting</div>
          <div>Estonia, Tartu</div>
          <div>27 years old</div>
          <div className={styles.buttons}>
            <CustomButton className={styles.button} icon={<MessageOutlined />}>
              {t("message")}
            </CustomButton>
            {follow ? (
              <CustomButton
                className={styles.button}
                onClick={handleFollow}
                icon={<CheckOutlined />}
              >
                {t("followed")}
              </CustomButton>
            ) : (
              <CustomButton
                className={styles.button}
                onClick={handleFollow}
                icon={<PlusCircleOutlined />}
              >
                {t("follow")}
              </CustomButton>
            )}
          </div>
        </div>
        <FavoriteExercises />
      </div>
    </>
  );
};
