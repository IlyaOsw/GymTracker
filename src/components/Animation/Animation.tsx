import React, { useEffect } from "react";
import "./Animation.module.scss";

export const Animation: React.FC = () => {
  useEffect(() => {
    const animationOnScroll = () => {
      const items = document.querySelectorAll(".animation_item");
      for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;
        const itemHeight = item.offsetHeight;
        const itemTop = offset(item).top;
        const start = 4;

        let itemPoint = window.innerHeight - itemHeight / start;
        if (itemHeight > window.innerHeight) {
          itemPoint = window.innerHeight - window.innerHeight / start;
        }
        if (
          window.scrollY > itemTop - itemPoint &&
          window.scrollY < itemTop + itemHeight
        ) {
          item.classList.add("active");
        } else if (!item.classList.contains("hide")) {
          item.classList.remove("active");
        }
      }
    };

    const offset = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    };

    animationOnScroll();

    window.addEventListener("scroll", animationOnScroll);

    return () => {
      window.removeEventListener("scroll", animationOnScroll);
    };
  }, []);

  return <></>;
};
