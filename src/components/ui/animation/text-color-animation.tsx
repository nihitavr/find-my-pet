import React from "react";
import { cn } from "~/lib/utils";

const TextColorAnimation = ({
  children,
  className,
  fromColor,
  toColor,
  duration = 1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  fromColor: string;
  toColor: string;
  duration?: number;
  delay?: number;
}) => {
  const animationStyle: React.CSSProperties = {
    // background: `linear-gradient(270deg, ${fromColor}, ${toColor}, ${fromColor})`,
    background: `linear-gradient(270deg, ${fromColor}, ${toColor}, ${fromColor})`,
    backgroundSize: "100% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationFillMode: "forwards",
    animationTimingFunction: "linear",
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };

  return (
    <div
      className={cn("animate-text-color-gradient inline", className)}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default TextColorAnimation;
