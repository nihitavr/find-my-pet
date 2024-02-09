import { MoveRight } from "lucide-react";
import Image from "next/image";

export default async function HowToGetStarted() {
  return (
    <div className="p-5 md:px-28 md:pb-10">
      <h1 className="text-center text-3xl font-semibold md:text-4xl">
        How to get started?
      </h1>
      <div className="grid grid-cols-1 pt-7 md:grid-cols-5">
        <div className="flex items-center gap-2 md:flex-col">
          <div className="relative h-60 w-60">
            <Image
              fill
              src={"/how-to-get-started-1.svg"}
              alt="Scan qr code on pet tag image"
              className="object-contain"
            />
          </div>
          <span className="font-semibold">Scan QR code on pet tag</span>
        </div>
        <div className="flex items-center justify-center">
          <MoveRight
            size={80}
            strokeWidth={1}
            className="rotate-90 text-primary/70 md:rotate-0"
          />
        </div>
        <div className="flex items-center gap-2 md:flex-col">
          <div className="relative h-60 w-60">
            <Image
              fill
              src={"/how-to-get-started-2.svg"}
              alt="Sign up and enter your details image"
              className="object-contain"
            />
          </div>
          <span className="font-semibold">Sign up and enter your details</span>
        </div>
        <div className="flex items-center justify-center">
          <MoveRight
            size={80}
            strokeWidth={1}
            className="rotate-90 text-primary/70 md:rotate-0"
          />
        </div>
        <div className="flex items-center gap-2 md:flex-col">
          <div className="relative h-60 w-60">
            <Image
              fill
              src={"/how-to-get-started-3.svg"}
              alt="Create pet profile and connect tag image"
              className="object-contain"
            />
          </div>
          <span className="font-semibold">
            Create pet profile and connect tag
          </span>
        </div>
      </div>
    </div>
  );
}
