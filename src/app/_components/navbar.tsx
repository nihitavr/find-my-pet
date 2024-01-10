import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/lib/auth";
import UserButton from "./ui/user-button";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="header-bg-color flex items-center justify-between border-b px-2 py-3 md:px-10">
      <div className="flex flex-col items-center space-x-2 md:flex-row">
        <div className="relative h-12 w-12">
          <Image
            src="/find-my-pet-logo-white.svg"
            alt="Logo"
            className="rounded-lg"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <span className="text-primary-dark text-sm font-bold md:inline md:text-lg">
          Find My Pet
        </span>
      </div>
      <div className="text-primary flex items-center space-x-5">
        {/* Home Us button */}
        <button className="hover:text-primary-dark hover:scale-105">
          Home
        </button>
        {/* Contact Us button */}
        <button className="hover:text-primary-dark hover:scale-105">
          Contact Us
        </button>
        {/* Profile Button */}
        <Link
          className="hover:text-primary-dark hover:scale-105"
          href="/profile"
        >
          Profile
        </Link>

        {/* <UserButton /> */}
        <Link
          href={session?.user ? "/api/auth/signout" : "/api/auth/signin"}
          className="button-dark"
        >
          {session?.user ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
}
