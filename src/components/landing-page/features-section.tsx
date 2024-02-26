import Image from "next/image";
import React from "react";
import { FadeInAnimation } from "../ui/animation/fade-in-animation";

export default async function Features() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-white px-5 py-8 md:gap-10 md:px-28 md:py-10">
      {/* Left Text */}
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:text-5xl ">
        Pawsome Features
      </h1>
      <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-3">
        <div className="col-span-1 flex flex-col items-center gap-3">
          <FadeInAnimation animateOnVisible duration={1} delay={0.3}>
            <Image
              src="/howitworks-pet-profile.png"
              alt="how it works scan qr code"
              width={350}
              height={350}
            />
          </FadeInAnimation>
          <span className="mt-2 text-center text-2xl font-semibold">
            Pet Collar tag
          </span>
          <span className="text-center">
            Light weight, durable and easy to use collar tag, clipping it is as
            easy as a traditional collar tag
          </span>
        </div>

        <div className="col-span-1 flex flex-col items-center gap-3">
          <FadeInAnimation animateOnVisible duration={1} delay={0.3}>
            <Image
              src="/howitworks-gps-alerts.png"
              alt="how it works create profile"
              width={350}
              height={350}
            />
          </FadeInAnimation>
          <span className="mt-2 text-center text-2xl font-semibold">
            Online Pet Profile
          </span>
          <span className="text-center">
            Include their name, photo, breed, any medical conditions, and your
            contact information. Mask private data with a click
          </span>
        </div>

        <div className="col-span-1 flex flex-col items-center gap-3">
          <FadeInAnimation animateOnVisible duration={1} delay={0.3}>
            <Image
              src="/howitworks-pet-family.png"
              alt="how it works attach collar"
              width={350}
              height={350}
            />
          </FadeInAnimation>
          <span className="mt-2 text-center text-2xl font-semibold">
            Notifications
          </span>
          <span className="text-center">
            Create a digital bridge between your pet and you , getting instantly
            notified when someone scans the QR code
          </span>
        </div>
      </div>
    </div>
  );
}
