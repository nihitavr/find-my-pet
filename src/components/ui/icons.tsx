"use client";

import { Instagram, Share as ShareLucid } from "lucide-react";
import React from "react";
export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Share = ({ className, ...props }: any) => {
  const shareInfo = {
    title: "Web Share Example",
    text: "Check out this web share example!",
    url: "https://findmypet.in",
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareInfo);
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error in sharing:", error);
      }
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };
  return (
    <div {...props} onClick={handleShare}>
      <ShareLucid className={className} />
    </div>
  );
};
