import { useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const useAnimatedInView = (
  threshold: number = 0.1,
  triggerOnce: boolean = true,
  animationVariants?: Variants
) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls, animationVariants };
};
