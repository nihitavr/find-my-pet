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
        <span className="text-[1.7rem] font-semibold leading-8 md:text-4xl lg:text-5xl">
          {/* Scan & Reunite */}
          {/* Lost Pet? Scan Our QR Collar Tag for Instant Contact! */}
          Lost Pet? Scan our{" "}
          <span className="text-primary">QR collar tag </span> for Instant Pet
          Parent info!
        </span>
        <span className="text-foreground/90">
          Ensure pet safety with our{" "}
          <span className="font-semibold">durable, laser-etched</span> QR collar
          tag, crafted from fine, scratch-resistant metal. A quick scan reveals
          your <span className="font-semibold">pet&apos;s profile</span> and{" "}
          <span className="font-semibold">contact info</span>, along with{" "}
          <span className="font-semibold">location updates</span> and{" "}
          <span className="font-semibold">alerts</span> on scan.
          {/* Our QR collar tag
          not only complements your pet's personality but also helps you find
          your <span className="font-semibold">lost pet.</span> When someone
          scans the pet tag, their{" "}
          <span className="font-semibold">location is recorded</span> and they
          can access your pet&apos;s profile to{" "}
          <span className="font-semibold">contact you immediately.</span> */}
          {/* Purchase our{" "}
          <span className="font-semibold">QR Collar Tag</span> and create a{" "}
          <span className="font-semibold">pet profile.</span> When someone scans
          your <span className="font-semibold">lost</span> pet&apos;s tag, their{" "}
          <span className="font-semibold">location is recorded</span> and they
          can access your pet&apos;s profile to contact you immediately. */}
        </span>

        {/* Buy Now */}
        <div className="">
          <span className="pl-1 font-semibold">Our Products</span>
          <BuyItemsCarousal
            className=" w-full"
            shopItemsPrefixes={shopItemsPrefixes}
          />
        </div>
        <div>
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
