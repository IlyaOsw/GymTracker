import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { SocialLinksType } from "types/store/social-links";
import { SubTitle } from "components/SubTitle/SubTitle";

import styles from "./SocialMedia.module.scss";

export const SocialMedia: React.FC = () => {
  const { t } = useTranslation();
  const socialMedia = useSelector(
    (state: { socialMedia: SocialLinksType[] }) => state.socialMedia
  );

  return (
    <div className={styles.socialMedia}>
      <SubTitle children={t("socialMedia")} />
      {socialMedia.map((link) => (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          key={link.id}
        >
          <img
            src={
              process.env.PUBLIC_URL + `/assets/Icons/Footer/${link.label}.svg`
            }
            alt={`${link.label} icon`}
          />
        </a>
      ))}
    </div>
  );
};
