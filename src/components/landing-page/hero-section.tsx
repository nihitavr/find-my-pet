import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default async function HeroSection() {
  return (
    <div className="flex flex-col-reverse items-center justify-center gap-5 px-5 py-5 md:flex-row md:gap-5 md:px-28 md:py-16">
      {/* Left Text */}
      <div className="flex flex-1 flex-col items-start gap-2 md:gap-8">
        <span className="whitespace-normal text-4xl font-bold text-primary-dark md:text-7xl">
          Scan & Reunite
        </span>
        <span>
          Never worry about a <span className="font-semibold">lost pet </span>
          again: Introducing the{" "}
          <span className="font-semibold">QR Collar Tag</span>. Purchase our tag
          and create a <span className="font-semibold">pet profile</span> to
          ensure you never lose your pet.
        </span>

        <Button className="mt-2">Buy on Amazon</Button>
      </div>

      {/* Hero Image */}
      <div className="flex flex-1 justify-end">
        <Image
          className="rounded-lg"
          src="/dog-with-pet-collar.jpg"
          alt="dog with collar tag"
          width={575}
          height={575}
        />
      </div>

      {/* <div className="flex flex-col items-center gap-2">
          <p className="text-primary text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div> */}
    </div>
  );
}
