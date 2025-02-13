import { SocialLinksType, SocialLinks } from "../../types/store/social-links";

const initialState: SocialLinksType[] = [
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

export const socialMediaReducer = (state: SocialLinksType[] = initialState) => {
  return state;
};

export const actions = {};
