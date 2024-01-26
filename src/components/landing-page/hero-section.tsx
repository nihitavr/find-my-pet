import React from "react";
import { Button } from "../ui/button";
import PhotoCasousel from "../photo-carousel";
import BuyItemsCarousal from "./buy-items-carousal";

const shopItemsPrefixes = ["bruni", "hope", "mars", "mush", "simba"];

export default async function HeroSection() {
  return (
    <div className="justify flex flex-col-reverse items-center gap-5 p-5 pb-8 md:flex-row md:gap-10 md:px-28 md:py-16">
      {/* Left Text */}
      <div className="flex w-full flex-1 flex-col justify-center gap-2 md:gap-3">
        <span className="text-3xl font-semibold md:text-5xl">
          {/* Scan & Reunite */}
          QR Pet Tags
        </span>
        <span className="text-xl font-semibold text-foreground/90 md:text-3xl">
          Every adventure leads Home!
        </span>
        <span className="text-foreground/90">
          Never worry about a <span className="font-semibold">lost pet </span>
          again with our <span className="font-semibold">QR Pet Tag</span>.
          Purchase our tag and create a{" "}
          <span className="font-semibold">pet profile</span> to receive alerts
          when someone scans your lost pet&apos;s QR tag.
        </span>

        <BuyItemsCarousal shopItemsPrefixes={shopItemsPrefixes} />
        <div className="mt-5 flex justify-end">
          <Button className="mt-2 w-full">Buy Now</Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative flex aspect-[6/5] w-full flex-1 justify-end">
        <PhotoCasousel
          images={["/dog-with-pet-collar.jpg", "/cat-with-pet-collar.jpg"]}
          className="aspect-[6/5] w-full"
          imageClassName="rounded-xl"
          defaultImage="/dog-with-pet-collar.jpg"
          autoplay={true}
        />
      </div>
    </div>
  );
}
