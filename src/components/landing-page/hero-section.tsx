import React from "react";
import { Button } from "../ui/button";
import PhotoCasousel from "../photo-carousel";
import BuyItemsCarousal from "./buy-items-carousal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const shopItemsPrefixes = ["bruni", "mini", "hope", "mars", "mush", "simba"];

export default async function HeroSection() {
  return (
    <div className="justify flex flex-col-reverse items-center gap-5 p-5 pb-8 md:flex-row md:gap-10 md:px-28 md:py-16">
      {/* Left Text */}
      <div className="flex w-full flex-1 flex-col justify-center gap-3 md:gap-6">
        <span className="text-3xl font-semibold md:text-4xl lg:text-5xl">
          {/* Scan & Reunite */}
          Lost Pet? Scan Our QR Collar Tag for Instant Contact!
        </span>
        <span className="text-foreground/90">
          Purchase our <span className="font-semibold">QR Collar Tag</span> and
          create a <span className="font-semibold">pet profile.</span> When
          someone scans your <span className="font-semibold">lost</span>{" "}
          pet&apos;s tag, their{" "}
          <span className="font-semibold">location is recorded</span> and they
          can access your pet&apos;s profile to contact you immediately.
        </span>

        <BuyItemsCarousal
          className="mt-3 w-full"
          shopItemsPrefixes={shopItemsPrefixes}
        />
        <div className="mt-3">
          <div className="text-xs">
            This will open a <span className="font-semibold">Google Form</span>{" "}
            for checkout.*
          </div>
          <Link href={"https://forms.gle/uQedFpbeEBM2m4NEA"} target="_blank">
            <Button className="w-full">
              Buy Now <ArrowUpRight />
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative flex aspect-[6/5] w-full flex-1 flex-shrink-0 justify-end">
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
