import Image from "next/image";
import React from "react";

export default async function Features() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-white px-5 py-16 md:gap-10 md:px-40">
      {/* Left Text */}
      <h1 className="text-center text-4xl font-bold tracking-tight text-primary-dark sm:text-[4rem]">
        Features
      </h1>
      <div className="flex w-full flex-col justify-between gap-10 md:flex-row md:gap-20">
        <div className="flex flex-col items-center gap-2">
          <Image
            className="rounded-lg"
            src="/howitworks-scan-qrcode.png"
            alt="how it works scan qr code"
            width={300}
            height={300}
          />
          <span className="text-center text-xl font-semibold">
            Pet Collar tag
          </span>
          <span className="text-center">
            Light weight, durable and easy to use collar tag, clipping it is as
            easy as a traditional collar tag
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Image
            className="rounded-lg"
            src="/howitworks-create-profile.png"
            alt="how it works create profile"
            width={300}
            height={300}
          />
          <span className="text-center text-xl font-semibold">
            Online Pet Profile
          </span>
          <span className="text-center">
            Include their name, photo, breed, any medical conditions, and your
            contact information. Mask private data with a click
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Image
            className="rounded-lg"
            src="/howitworks-attach-collar.png"
            alt="how it works attach collar"
            width={300}
            height={300}
          />
          <span className="text-center text-xl font-semibold">
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
