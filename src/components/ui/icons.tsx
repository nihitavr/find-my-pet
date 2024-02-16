"use client";

import { Share as ShareLucid } from "lucide-react";
import React from "react";

interface ShareInfo {
  title: string;
  url: string;
  text: string;
}

interface Props {
  className?: string;
  shareInfo: ShareInfo;
  children?: React.ReactNode;
}

export const Share = ({ className, shareInfo, children, ...props }: Props) => {
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
    <div
      {...props}
      onClick={handleShare}
      className="flex items-center justify-center gap-2"
    >
      {children ? children : <ShareLucid className={className} />}
    </div>
  );
};
