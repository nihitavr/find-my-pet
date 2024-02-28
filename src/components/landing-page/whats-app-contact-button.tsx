"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const WhatsAppButton = () => {
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - 200
      ) {
        setIsScrollAtEnd(true);
      } else {
        setIsScrollAtEnd(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/6363822930"
      target="_blank"
      rel="noreferrer"
      className={cn(
        "fixed bottom-8 right-5 z-50 flex items-center justify-end overflow-hidden rounded-full p-1 hover:scale-105 md:bottom-10 md:right-10",
        isScrollAtEnd ? "bg-slate-100 shadow-md" : "",
      )}
    >
      <span
        className={cn(
          "translate-x-full whitespace-nowrap font-semibold transition-all duration-200",
          isScrollAtEnd ? "w-min translate-x-0 px-2" : "w-0 opacity-0",
        )}
      >
        Contact Us
      </span>
      <div className="relative z-10 h-10 w-10 md:h-12 md:w-12">
        <Image
          fill
          style={{ objectFit: "contain" }}
          src="/whatsapp-icon-home-page.svg"
          alt="whatsapp logo"
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
