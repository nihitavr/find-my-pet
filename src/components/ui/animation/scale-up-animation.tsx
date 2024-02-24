"use client";

import { useEffect, useRef, useState } from "react";

export const ScaleUpAnimation = ({
  children,
  scroll,
  duration = 1,
  delay = 0,
  animateOnVisible = false,
  props,
}: {
  children: React.ReactNode;
  scroll?: number;
  duration?: number;
  delay?: number;
  animateOnVisible?: boolean;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIfVisible] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scroll && window.scrollY > scroll) {
        setIsScrolled(true);
      }

      const rect = ref.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight) {
        setIfVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (scroll && !isScrolled) {
    return <></>;
  }

  return (
    <div
      style={{
        animation:
          animateOnVisible && !isVisible
            ? ""
            : `scaleUp ${duration}s linear ${delay}s forwards`,

        // We need to set the height and width to some value otherwise all the elements will be come into visibility at once.
        height: `${animateOnVisible && !isVisible ? "100px" : "auto"}`,
        width: `${animateOnVisible && !isVisible ? "100px" : "auto"}`,
      }}
      ref={ref}
      {...props}
    >
      {(!animateOnVisible || isVisible) && children}
    </div>
  );
};
