import Image from "next/image";
import React from "react";
import { FadeInAnimation } from "../../ui/animation/fade-in-animation";

export default async function OurInspirationSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-white px-5 py-8 md:gap-10 md:px-28 md:py-14">
      {/* Left Text */}
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:text-5xl ">
        Who are we?
      </h1>
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-5">
        <FadeInAnimation
          // className="order-1 col-span-1 flex flex-col items-center justify-center gap-3 md:-order-1 md:p-10"
          className="order-1 col-span-1 flex flex-col items-center justify-center gap-3 md:-order-1 md:rounded-2xl md:border md:bg-accent/60 md:p-10 md:shadow-md"
          animateOnVisible
          duration={1}
        >
          <span className="text-center">
            Welcome to our world, where every pet is cherished like a family
            member. As the founders of{" "}
            <span className="font-semibold">Find My Pet</span>, our journey
            began with our two beloved Persian cats,{" "}
            <span className="font-semibold">Mini</span> and{" "}
            <span className="font-semibold">Mush</span>. Their safety and
            well-being are at the heart of everything we do. Our passion for
            pets inspired us to create our innovative Pet QR tags, ensuring that
            our furry friends are always just a scan away from home. Our
            commitment to the pet industry doesn&apos;t stop here; we are
            excited to explore and introduce a range of products and services
            that cater to the diverse needs of pet owners. Join us in our
            mission to make the world a safer and happier place for all pets.{" "}
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
            width={450}
            height={450}
          />
        </FadeInAnimation>
      </div>
    </section>
  );
}
