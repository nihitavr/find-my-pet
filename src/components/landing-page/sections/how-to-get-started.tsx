import { MoveRight } from "lucide-react";
import Image from "next/image";

export default async function HowToGetStarted() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-slate-50 px-5 py-8 md:gap-10 md:px-28 md:py-10">
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:min-h-14 md:text-5xl">
        How to get started?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="grid grid-cols-2 items-center md:grid-cols-1">
          <div className="relative h-60 md:h-80">
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
            className="rotate-90 scale-75 text-foreground/70 md:rotate-0 md:scale-100"
          />
        </div>
        <div className="grid grid-cols-2 items-center md:grid-cols-1">
          <div className="relative h-72 md:h-80">
            <Image
              fill
              src={"/how-to-get-started-2.png"}
              alt="Sign up and enter your details image"
              className="object-contain"
            />
          </div>
          <span className="text-center text-lg font-semibold">
            Sign up and enter your contact details
          </span>
        </div>
        <div className="flex items-center justify-center">
          <MoveRight
            size={80}
            strokeWidth={1}
            className="rotate-90 scale-75 text-foreground/70 md:rotate-0 md:scale-100"
          />
        </div>
        <div className="grid grid-cols-2 items-center md:grid-cols-1">
          <div className="relative h-72 md:h-80">
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
    </section>
  );
}
