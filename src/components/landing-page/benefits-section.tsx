import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default async function BenefitsSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-secondary p-5 text-secondary-foreground md:flex-row md:gap-5 md:px-28">
      {/* Benefits Image */}
      <div className="flex flex-1 justify-start">
        <Image
          className="rounded-lg"
          src="/pet-found.jpg"
          alt="dog with collar tag"
          width={575}
          height={575}
        />
      </div>

      {/* Right Text */}
      <div className="flex flex-1 flex-col items-start gap-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-6xl">
          Lost Pet? Scan Our QR Code Tag for Instant Contact!
        </h1>
        <span>
          Our QR code tags provide peace of mind for pet owners. In case your
          pet gets lost, anyone who finds them can easily scan the QR code on
          the tag to access your pet&apos;s information and contact you
          immediately.
        </span>

        <Button>Buy on Amazon</Button>
      </div>
    </div>
  );
}
