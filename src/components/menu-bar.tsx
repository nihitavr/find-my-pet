"use client";

import Link from "next/link";

export default function Menubar() {
  return (
    <Link className="hover:text-foreground hover:scale-105" href="/dashboard" />
  );
}
