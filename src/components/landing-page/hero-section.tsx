import React from "react";
import Image from "next/image";
import { FadeInAnimation } from "../ui/animation/fade-in-animation";
import WipeAnimation from "../ui/animation/wipe-animation";

export default async function HeroSection() {
  return (
    <div className="justify relative flex flex-col-reverse items-center gap-2 p-5 md:flex-row md:gap-10 md:px-28 md:pb-5 md:pt-10">
      {/* Left Text */}
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-3 md:gap-6">
        <div className="w-min">
          <WipeAnimation
            animationDuration={0.5}
            animationDelay={0.5}
            // className="text-4xl font-semibold text-primary opacity-0 md:text-6xl lg:text-7xl"
            className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-4xl font-semibold text-transparent opacity-0 md:text-6xl lg:text-7xl"
          >
            Lost Pet?
          </WipeAnimation>
        </div>
        <div className="w-min">
          <WipeAnimation
            animationDelay={1}
            animationDuration={0.75}
            className="text-2xl font-semibold text-foreground/90 opacity-0 md:text-3xl lg:text-4xl"
          >
            Introducing QR Pet tags
          </WipeAnimation>
        </div>
        <span className="break-words text-center text-foreground/90">
          Our QR pet tags are{" "}
          <span className="font-semibold"> durable, scratch-resistant </span>
          and gives instant
          <span className="font-semibold"> pet parent contact info </span>&
          <span className="font-semibold"> location alerts </span>
          on QR code scan.
        </span>
      </div>

      {/* Hero Image */}
      <div className="relative flex w-full flex-col items-center gap-2 md:w-1/2">
        <div className="flex items-center justify-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src="/hero-image-tagline-support-image-left.svg"
              alt="tagline support image"
              loading="lazy"
              fill
              objectFit="contain"
            />
          </div>
          <span className="font-semibold md:text-2xl">
            Safe Paws, Happy Hearts!
          </span>
          <div className="relative h-10 w-10">
            <Image
              src="/hero-image-tagline-support-image-right.svg"
              alt="tagline support image"
              loading="lazy"
              fill
              objectFit="contain"
            />
          </div>
        </div>
        <div className="relative aspect-[7/5] w-full">
          <FadeInAnimation delay={0} duration={0.5}>
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
