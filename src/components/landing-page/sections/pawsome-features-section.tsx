import Image from "next/image";
import React from "react";
import { FadeInAnimation } from "../../ui/animation/fade-in-animation";

export default async function PawsomeFeatures() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-white px-5 py-8 md:gap-10 md:px-28 md:py-10">
      {/* Left Text */}
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:text-5xl ">
        Pawsome Features
      </h1>
      <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-3">
        <FadeInAnimation
          className="col-span-1 flex flex-col items-center gap-3"
          animateOnVisible
          duration={1}
        >
          <Image
            src="/howitworks-pet-profile.png"
            alt="how it works scan qr code"
            width={350}
            height={350}
          />
          <span className="mt-2 text-center text-2xl font-semibold">
            Pet profile & Contact info
          </span>
          <span className="text-center">
            Our pet tag provides easy access to your contact info with privacy
            controls for WhatsApp/Call communication, as well as pet details
            such as age, breed, behavior tags, and more.
          </span>
        </FadeInAnimation>

        <FadeInAnimation
          className="col-span-1 flex flex-col items-center gap-3"
          animateOnVisible
          duration={1}
        >
          <Image
            src="/howitworks-gps-alerts.png"
            alt="how it works create profile"
            width={350}
            height={350}
          />
          <span className="mt-2 text-center text-2xl font-semibold">
            GPS Alerts & Location sharing
          </span>
          <span className="text-center">
            Receive an email alert when your pet&apos;s tag is scanned. The
            finder can also easily send their location via WhatsApp with just a
            click.
          </span>
        </FadeInAnimation>

        <FadeInAnimation
          className="col-span-1 flex flex-col items-center gap-3"
          animateOnVisible
          duration={1}
        >
          <Image
            src="/howitworks-pet-family.png"
            alt="how it works attach collar"
            width={350}
            height={350}
          />
          <span className="mt-2 text-center text-2xl font-semibold">
            Sharable profile & Pet family
          </span>
          <span className="text-center">
            Create a single showcase for all your pet profiles and connect them
            to Instagram for easy sharing, all while keeping your contact
            infomation private.
          </span>
        </FadeInAnimation>
      </div>
    </section>
  );
}
