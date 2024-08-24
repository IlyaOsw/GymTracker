export const scrollToTop = () =>
  setTimeout(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, 100);
