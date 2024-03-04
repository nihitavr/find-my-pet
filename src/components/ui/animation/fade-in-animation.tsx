"use client";

import { useEffect, useRef, useState } from "react";

export const FadeInAnimation = ({
  children,
  className,
  scroll,
  duration = 1,
  delay = 0,
  animateOnVisible = false,
  props,
}: {
  children: React.ReactNode;
  className?: string;
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

      if (rect && rect.top < window.innerHeight - 10 && !isVisible) {
        setIfVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    handleScroll();

    if (animateOnVisible) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (scroll && !isScrolled) {
    return <></>;
  }

  return (
    <div
      className={className}
      style={{
        animation:
          animateOnVisible && !isVisible
            ? ""
            : `fade-in ${duration}s ease-in-out ${delay}s forwards`,
        opacity: 0,

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
