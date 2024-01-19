import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/lib/auth";
import Menubar from "./menu-bar";
import SignIn from "./sign-in";
import SignOut from "./sign-out";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="header-bg-color flex items-center justify-between border-b px-2 py-2 md:px-10 md:py-2">
      <div className="flex flex-row items-center space-x-0 md:flex-row">
        <Link href="/">
          <div className="relative h-12 w-48">
            <Image
              src="/find-my-pet-logo-dark-brown.svg"
              alt="Logo"
              className="rounded-lg"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        {/* <span className="text-base font-semibold text-black md:inline md:text-lg">
          Find My Pet
        </span> */}
      </div>
      <div className="flex items-center space-x-5 text-primary">
        <Menubar />

        {session?.user ? <SignOut /> : <SignIn />}
        {/* <Link
          href={session?.user ? "/api/auth/signout" : "/api/auth/signin"}
          className="button-primary-2"
        >
          {session?.user ? "Sign Out" : "Sign In"}
        </Link> */}
      </div>
    </nav>
  );
}
