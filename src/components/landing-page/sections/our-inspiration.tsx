import Image from "next/image";
import React from "react";
import { FadeInAnimation } from "../../ui/animation/fade-in-animation";

export default async function OurInspirationSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-white px-5 py-8 md:gap-10 md:px-28 md:py-14">
      {/* Left Text */}
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:text-5xl ">
        Fur-Founder Squad!
      </h1>
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-5">
        <FadeInAnimation
          // className="order-1 col-span-1 flex flex-col items-center justify-center gap-3 md:-order-1 md:p-10"
          className="order-1 col-span-1 flex flex-col items-center justify-center gap-3 md:-order-1 md:rounded-2xl md:border md:bg-accent/60 md:p-10 md:shadow-md"
          animateOnVisible
          duration={1}
        >
          <span className="text-center">
            <span className="font-semibold">Find My Pet</span> is inspired by
            two clever cats, Mini and Mush. Our journey started with a simple
            goal: to keep pets safe with just a quick scan. Mini and Mush, more
            than cute faces, sparked the idea for our Pet QR tags. They also
            showed us how pets make life better, with a dash of cat attitude.
            Our aim is to keep them close, safe, and happy. We&apos;re dedicated
            to creating solutions for pets and their owners. Join us in making
            sure every pet adventure ends safely. Let&apos;s turn the world into
            a playground where every pet is just a scan away from home.
          </span>
        </FadeInAnimation>

        <FadeInAnimation
          className="col-span-1 flex flex-col items-center gap-3"
          animateOnVisible
          duration={1}
        >
          <Image
            src="/mini-mush-inspiration.jpg"
            alt="how it works attach collar"
            width={450}
            height={450}
          />
        </FadeInAnimation>
      </div>
    </section>
  );
}
