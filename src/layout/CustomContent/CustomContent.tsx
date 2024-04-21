import React from "react";
import { Layout } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";

import { CustomButton } from "../../components/Button/CustomButton";

import styles from "./CustomContent.module.scss";

const { Content } = Layout;
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "lightgray",
  position: "relative",
};

export const CustomContent: React.FC = () => {
  return (
    <Content style={contentStyle}>
      <img
        className={styles.mainImage}
        src={process.env.PUBLIC_URL + "/assets/Images/MainImage.jpg"}
        alt="Logo"
      />
      <div className={styles.title}>
        YOUR FITNESS JOURNEY <br /> STARTS HERE
      </div>

      <div className={styles.buttons}>
        <CustomButton icon={<RightCircleOutlined />} className={styles.joinBtn}>
          Join today
        </CustomButton>
        <img
          className={styles.downloadImage}
          src={process.env.PUBLIC_URL + "/assets/Images/DownloadOnApp.png"}
          alt="Download"
        />
      </div>
    </Content>
  );
};
