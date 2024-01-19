"use client";

import Link from "next/link";

export default function Menubar() {
  return (
    <Link
      className="hover:scale-105 hover:text-primary-dark"
      href="/dashboard"
    />
  );
}
