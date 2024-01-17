import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/lib/auth";
import Menubar from "./menu-bar";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="header-bg-color flex items-center justify-between border-b px-2 py-2 md:px-10 md:py-2">
      <div className="flex flex-row items-center space-x-0 md:flex-row">
        <div className="relative h-12 w-12">
          <Image
            src="/find-my-pet-logo-black.svg"
            alt="Logo"
            className="rounded-lg"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        {/* <span className="text-base font-semibold text-black md:inline md:text-lg">
          Find My Pet
        </span> */}
      </div>
      <div className="flex items-center space-x-5 text-primary">
        {/* Home Us button */}
        {/* <button className="hover:scale-105 hover:text-primary-dark">
          Home
        </button> */}
        {/* Contact Us button */}
        {/* <button className="hover:scale-105 hover:text-primary-dark">
          Contact Us
        </button> */}
        {/* Profile Button */}
        <Menubar />

        <Link
          href={session?.user ? "/api/auth/signout" : "/api/auth/signin"}
          className="button-primary-2"
        >
          {session?.user ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
}
