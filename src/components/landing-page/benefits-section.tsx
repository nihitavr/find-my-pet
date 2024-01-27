import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function BenefitsSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-secondary p-5 text-secondary-foreground md:flex-row md:gap-5 md:px-28">
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
      <div className="flex flex-1 flex-col items-start gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-6xl">
          Lost Pet? Scan Our QR Code Tag for Instant Contact!
        </h1>
        <span>
          Our QR code tags provide peace of mind for pet owners. In case your
          pet gets lost, anyone who finds them can easily scan the QR code on
          the tag to access your pet&apos;s information and contact you
          immediately.
        </span>

        <Link
          href={"https://forms.gle/uQedFpbeEBM2m4NEA"}
          target="_blank"
          className="w-full"
        >
          <Button className="mt-2 w-full">
            Buy Now <ArrowUpRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
