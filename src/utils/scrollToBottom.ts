export const scrollToBottom = () =>
  setTimeout(() => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 150);
