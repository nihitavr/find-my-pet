"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SideNavSheet } from "./side-nav-sheet";
import { cn } from "~/lib/utils";
import { CartSideSheet } from "./cart-side-sheet";

export default function Header({ session }: { session: any }) {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollTop && currentScrollPos > 50) {
      // Scroll Up
      setHeaderVisible(false);
    } else {
      // Scroll Down
      setHeaderVisible(true);
    }

    setLastScrollTop(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full",
        headerVisible
          ? "translate-y-0 transition-transform duration-300 ease-in-out"
          : "-translate-y-full transition-transform duration-300 ease-in-out",
      )}
    >
      <nav className="flex items-center justify-between border-b bg-header px-2 py-1 shadow-sm md:px-10 md:py-2">
        <div className="flex flex-row items-center space-x-0 md:flex-row">
          <Link href="/">
            <div className="relative h-12 w-52">
              {/* <div className="relative h-12 w-44"> */}
              <Image
                src="/find-my-pet-logo-long.svg"
                alt="Logo"
                className="rounded-lg"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <CartSideSheet />
          <div className="flex items-center space-x-5">
            <SideNavSheet
              isSignedIn={!!session?.user}
              image={session?.user?.image}
              fallbackLetter={session?.user?.name?.[0] ?? "A"}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
