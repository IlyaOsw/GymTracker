import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons/lib/icons";

import styles from "../About.module.scss";

export const Media: React.FC = () => {
  return (
    <div className={styles.socialMedia}>
      <span className={styles.socialMediaTitle}>Social Media</span>
      <span className={styles.socialMediaItem}>
        <InstagramOutlined /> Instagram
      </span>
      <span className={styles.socialMediaItem}>
        <FacebookOutlined /> Facebook
      </span>
      <span className={styles.socialMediaItem}>
        <LinkedinOutlined /> LinkedIn
      </span>
    </div>
  );
};
