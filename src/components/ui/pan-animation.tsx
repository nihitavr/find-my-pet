"use client";

import React, { type ReactNode } from "react";
import { useOnScreen } from "~/lib/hooks";

export default function PanAnimation({
  animate = "from-left",
  children,
}: {
  animate?: "from-left" | "from-right";
  children: ReactNode;
}) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  console.log("isVisible", isVisible);

  // Determine which CSS class to use based on the animation direction
  let animationClass = "";
  if (isVisible) {
    animationClass =
      animate === "from-left"
        ? "animate-slide-in-from-left"
        : "animate-slide-in-from-right";
  }

  return (
    <div
      id={`${Math.random() * 100}`}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className={animationClass}>{children}</div>
    </div>
  );
}
