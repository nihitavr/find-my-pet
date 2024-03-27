"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import { FadeInAnimation } from "~/components/ui/animation/fade-in-animation";
import { useMediaQuery } from "~/lib/hooks/screen.hooks";

export default function HowToGetStarted() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-accent px-5 py-8 md:gap-10 md:px-28 md:py-14">
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:min-h-14 md:text-5xl">
        How to get started?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <FadeInAnimation animateOnVisible={true} duration={0.5} delay={0}>
          <div className="grid grid-cols-2 items-center md:grid-cols-1">
            <div className="relative h-60 md:h-80">
              <Image
                fill
                src={"/how-to-get-started-1.png"}
                alt="Scan qr code on pet tag image"
                className="object-contain"
              />
            </div>
            <span className="text-center text-lg font-semibold">
              Scan QR code on pet tag
            </span>
          </div>
        </FadeInAnimation>

        <FadeInAnimation
          className="flex items-center justify-center"
          animateOnVisible={true}
          duration={0.5}
          delay={isMobile ? 0 : 0.25}
        >
          {" "}
          <MoveRight
            size={60}
            strokeWidth={1}
            className="rotate-90 scale-75 text-foreground/70 md:rotate-0 md:scale-100"
          />
        </FadeInAnimation>

        <FadeInAnimation
          animateOnVisible={true}
          duration={0.5}
          delay={isMobile ? 0 : 0.5}
        >
          <div className="grid grid-cols-2 items-center md:grid-cols-1">
            <div className="relative h-72 md:h-80">
              <Image
                fill
                src={"/how-to-get-started-2.png"}
                alt="Sign up and enter your details image"
                className="object-contain"
              />
            </div>
            <span className="text-center text-lg font-semibold">
              Sign up and enter your contact details
            </span>
          </div>
        </FadeInAnimation>

        <FadeInAnimation
          className="flex items-center justify-center"
          animateOnVisible={true}
          duration={0.5}
          delay={isMobile ? 0 : 0.75}
        >
          <MoveRight
            size={60}
            strokeWidth={1}
            className="rotate-90 scale-75 text-foreground/70 md:rotate-0 md:scale-100"
          />
        </FadeInAnimation>

        <FadeInAnimation
          animateOnVisible={true}
          duration={0.5}
          delay={isMobile ? 0 : 1}
        >
          <div className="grid grid-cols-2 items-center md:grid-cols-1">
            <div className="relative h-72 md:h-80">
              <Image
                fill
                src={"/how-to-get-started-3.png"}
                alt="Create pet profile and connect tag image"
                className="object-contain"
              />
            </div>

            <span className="text-center text-lg font-semibold">
              Create pet profile and connect tag
            </span>
          </div>
        </FadeInAnimation>
      </div>
    </section>
  );
}
