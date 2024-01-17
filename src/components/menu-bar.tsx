"use client";

import Link from "next/link";
import useMediaQuery from "~/lib/hooks";

export default function Menubar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Link className="hover:scale-105 hover:text-primary-dark" href="/profile">
      {/* {isDesktop ? "Desktop" : "Mobile"} */}
    </Link>
  );
}
