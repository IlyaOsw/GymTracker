import React from "react";
import { useTranslation } from "react-i18next";

import { SocialLinks, SocialLinksType } from "../../../../types/types";
import { SubTitle } from "../../../../components/SubTitle/SubTitle";

import styles from "./SocialMedia.module.scss";

export const SocialMedia: React.FC = () => {
  const { t } = useTranslation();

  const links: SocialLinksType[] = [
    {
      id: 1,
      url: "https://www.linkedin.com/in/ilyaosw/",
      label: SocialLinks.LINKEDIN,
    },
    {
      id: 2,
      url: "https://www.facebook.com/ilyaosw",
      label: SocialLinks.FACEBOOK,
    },
    {
      id: 3,
      url: "https://www.instagram.com/ilya_osw/",
      label: SocialLinks.INSTAGRAM,
    },
  ];

  return (
    <div className={styles.socialMedia}>
      <SubTitle children={t("socialMedia")}></SubTitle>
      <span className={styles.socialMediaItems}>
        {links.map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link.id}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                `/assets/Icons/Footer/${link.label}.svg`
              }
              alt={`${link.label} icon`}
            />
          </a>
        ))}
      </span>
    </div>
  );
};
