import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default async function BenefitsSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-white px-5 py-16 md:flex-row md:gap-5 md:px-28">
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
        <h1 className="text-3xl font-bold tracking-tight text-primary-dark md:text-6xl">
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
