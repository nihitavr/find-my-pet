import Image from "next/image";
import React from "react";

export default async function HowItWorks() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-5 py-16 md:gap-10 md:px-40">
      {/* Left Text */}
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-[4rem]">
        Steps to Pet Security?
      </h1>
      <div className="flex w-full flex-col items-center justify-between gap-10 md:flex-row md:gap-20">
        <div className="flex flex-col items-center gap-2 text-xl font-semibold">
          <Image
            className="rounded-lg"
            src="/howitworks-scan-qrcode.png"
            alt="how it works scan qr code"
            width={300}
            height={300}
          />
          <div className="text-center">Buy and Scan QR Code</div>
        </div>

        <div className="flex flex-col items-center gap-2 text-xl font-semibold">
          <Image
            className="rounded-lg"
            src="/howitworks-create-profile.png"
            alt="how it works create profile"
            width={300}
            height={300}
          />
          <div className="text-center">Create online pet profile</div>
        </div>

        <div className="flex flex-col items-center gap-2 text-xl font-semibold">
          <Image
            className="rounded-lg"
            src="/howitworks-attach-collar.png"
            alt="how it works attach collar"
            width={300}
            height={300}
          />
          <div className="text-center">Attach collar tag to pet collars</div>
        </div>
      </div>
    </div>
  );
}
