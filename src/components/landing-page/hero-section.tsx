import React from "react";
import Image from "next/image";
import { FadeInAnimation } from "../ui/animation/fade-in-animation";

export default async function HeroSection() {
  return (
    <div className="justify relative flex flex-col-reverse items-center gap-2 p-5 md:flex-row md:gap-10 md:px-28 md:pb-5 md:pt-10">
      {/* Left Text */}
      <div className="flex w-full flex-1 flex-col justify-center gap-3 md:gap-6">
        <span className="text-center text-4xl font-semibold leading-8 text-primary md:text-6xl lg:text-7xl">
          Lost Pet?
        </span>
        <span className="text-center text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
          Introducing QR Pet tags
        </span>
        <span className="text-center text-foreground/90">
          Our QR pet tags are durable, scratch-resistant and gives instant
          <span className="font-semibold"> pet parent contact info</span> &{" "}
          <span className="font-semibold"> location alerts</span> on QR code
          scan.
        </span>
      </div>

      {/* Hero Image */}
      <div className="relative flex w-full flex-col items-center gap-2 md:w-1/2">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/hero-image-tagline-support-image.png"
            width={30}
            height={30}
            alt="tagline support image"
          />
          <span className="font-semibold md:text-2xl">
            Safe Paws, Happy Hearts!
          </span>
          <Image
            src="/hero-image-tagline-support-image.png"
            width={30}
            height={30}
            alt="tagline support image"
            className="rotate-180"
          />
        </div>
        <div className="relative flex aspect-[7/5] w-full flex-1 flex-shrink-0 justify-end rounded-3xl">
          <FadeInAnimation duration={0.5}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={"/hero-image-dog-cat.jpg"}
              alt="image of cat and dog"
            />
          </FadeInAnimation>
          <FadeInAnimation delay={0.5} duration={0.5}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={"/hero-image-dog-cat-1.jpg"}
              alt="image of cat and dog"
            />
          </FadeInAnimation>
        </div>
      </div>
    </div>
  );
}
