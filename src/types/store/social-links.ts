export enum SocialLinks {
  LINKEDIN = "Linkedin",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  TELEGRAM = "Telegram",
}

export type SocialLinksType = {
  id: number;
  url: string;
  label: SocialLinks;
};
