import { useState, useEffect } from "react";

const mobileLogoSrc =
  process.env.PUBLIC_URL + "/assets/Logo/LogoMainMobile.svg";
const desktopLogoSrc = process.env.PUBLIC_URL + "/assets/Logo/LogoMain.svg";

export const useResponsive = (mobileBreakpoint: number) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileBreakpoint
  );
  const [logoSrc, setLogoSrc] = useState(
    window.innerWidth <= mobileBreakpoint ? mobileLogoSrc : desktopLogoSrc
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= mobileBreakpoint);
      setLogoSrc(width <= mobileBreakpoint ? mobileLogoSrc : desktopLogoSrc);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  return { isMobile, logoSrc };
};
