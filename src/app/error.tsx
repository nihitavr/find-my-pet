"use client";

import { Dog } from "lucide-react";
import Image from "next/image";

const MESSAGES = [
  "Our server is having a catnap. We'll nudge it awake and get back to you soon.",
  "The server's got a furball. Give us a moment to groom it back to health.",
  "Our server is chasing its tail in circles. We'll sort it out shortly.",
  "The server's in the dog house right now. We're working to fetch it back.",
  "A squirrel ran through the server room. We're trying to get everything back in order!",
];

export default function Error() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <span className="text-primary text-center text-[3rem] font-medium">
        Oops...
        <Dog className="text-primary" stroke="" />
      </span>
      <div className="relative h-60 w-96">
        <Image
          layout="fill"
          style={{ objectFit: "contain" }}
          src="/errors/internal-server-error.svg"
          alt="Internal Server Error 500"
        />
      </div>
      <div className="px-3 text-center text-xl font-semibold">
        {MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}
      </div>
      <div>Try again later!</div>
    </div>
  );
}
