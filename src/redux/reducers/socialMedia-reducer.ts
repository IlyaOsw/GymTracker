import { SocialLinksType, SocialLinks } from "types/store/social-links";

const initialState: SocialLinksType[] = [
  {
    id: 1,
    url: "https://www.linkedin.com/in/ilyaosw/",
    label: SocialLinks.LINKEDIN,
  },
];

export const socialMedia = (state: SocialLinksType[] = initialState) => {
  return state;
};

export const actions = {};
