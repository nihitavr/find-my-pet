import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function StrikeAnimation({
  children,
  animationDuration = 1,
  animationDelay = 0,
  type = "middle",
  className,
}: {
  children: ReactNode;
  animationDelay?: number;
  animationDuration?: number;
  type?: "middle" | "top" | "bottom";
  className?: string;
}) {
  const position =
    type === "middle" ? "top-1/2" : type === "top" ? "top-0" : "-bottom-0.5";

  return (
    <div className={cn("relative inline min-w-max", className)}>
      <span>{children}</span>
      <div
        style={{
          animationDelay: `${animationDelay}s`,
          animationDuration: `${animationDuration}s`,
          animationFillMode: "forwards",
        }}
        className={cn(
          "animate-wipe-left-right absolute left-0 inline h-[2px] overflow-hidden whitespace-nowrap bg-foreground",
          position,
        )}
      ></div>
    </div>
  );
}
