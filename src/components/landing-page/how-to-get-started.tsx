import { MoveRight } from "lucide-react";
import Image from "next/image";

export default async function HowToGetStarted() {
  return (
    <div className="bg-slate-50 p-5 py-10 md:px-28">
      <h1 className="text-center text-3xl font-semibold md:text-4xl">
        How to get started?
      </h1>
      <div className="pt-1 text-center text-lg text-primary">
        Get started in three easy steps.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 md:pt-7">
        <div className="grid grid-cols-2 items-center md:grid-cols-1">
          <div className="relative h-72 md:h-96">
            <Image
              fill
              src={"/how-to-get-started-1.png"}
              alt="Scan qr code on pet tag image"
              className="object-contain"
            />
          </div>
          <span className="text-center text-lg font-semibold">
            Scan QR code on pet tag
          </span>
        </div>
        <div className="flex items-center justify-center">
          <MoveRight
            size={80}
            strokeWidth={1}
            className="rotate-90 text-primary/70 md:rotate-0"
          />
        </div>
        <div className="grid grid-cols-2 items-center md:grid-cols-1">
          <div className="relative h-72 md:h-96">
            <Image
              fill
              src={"/how-to-get-started-2.png"}
              alt="Sign up and enter your details image"
              className="object-contain"
            />
          </div>
          <span className="text-center text-lg font-semibold">
            Sign up and enter your details
          </span>
        </div>
        <div className="flex items-center justify-center">
          <MoveRight
            size={80}
            strokeWidth={1}
            className="rotate-90 text-primary/70 md:rotate-0"
          />
        </div>
        <div className="grid grid-cols-2 items-center md:grid-cols-1">
          <div className="relative h-72 md:h-96">
            <Image
              fill
              src={"/how-to-get-started-3.png"}
              alt="Create pet profile and connect tag image"
              className="object-contain"
            />
          </div>

          <span className="text-center text-lg font-semibold">
            Create pet profile and connect tag
          </span>
        </div>
      </div>
    </div>
  );
}
