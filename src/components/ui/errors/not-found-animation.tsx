"use client";

import Lottie from "lottie-react";
import pageNotFoundAnimation from "public/errors/page-not-found-animation.json";

export default function NotFoundAnimation() {
  return (
    <div className="w-96">
      <Lottie animationData={pageNotFoundAnimation} loop={true} />
    </div>
  );
}
