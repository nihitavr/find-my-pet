import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/lib/auth";
import { MobileSideNavSheet } from "./mobile-side-nav-sheet";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between border-b bg-header bg-white px-2 py-1 shadow-sm md:px-10 md:py-2">
      <div className="flex flex-row items-center space-x-0 md:flex-row">
        <Link href="/">
          <div className="relative h-12 w-52">
            {/* <div className="relative h-12 w-44"> */}
            <Image
              src="/find-my-pet-logo-dark-long.svg"
              alt="Logo"
              className="rounded-lg"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-5">
        <MobileSideNavSheet
          isSignedIn={!!session?.user}
          image={session?.user?.image}
          fallbackLetter={session?.user?.name?.[0] ?? "A"}
        />
      </div>
    </nav>
  );
}
