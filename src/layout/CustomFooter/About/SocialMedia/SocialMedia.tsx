import React from "react";
import { useTranslation } from "react-i18next";

import { SocialLinks } from "../../../../types/types";

import styles from "./SocialMedia.module.scss";

export const SocialMedia: React.FC = () => {
  const { t } = useTranslation();

  const links: { id: number; url: string; label: SocialLinks }[] = [
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
      <span className={styles.socialMediaTitle}>{t("socialMedia")}</span>
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
