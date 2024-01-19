"use client";

import Image from "next/image";
import { Button } from "./button";
import { PhoneOutgoing } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/";

export default function PetProfileCallButtons({
  phoneNumber,
}: {
  phoneNumber?: string;
}) {
  return (
    <div className="flex gap-3">
      <Button
        className="w-1/2 flex-1 space-x-2 border border-green-700 bg-white text-green-900 hover:bg-green-50"
        onClick={() => {
          window.open(
            `${WHATSAPP_URL}${phoneNumber}?text=Hi, I found your pet!`,
          );
        }}
      >
        <span>WhatsApp</span>
        <div className="relative h-7 w-7">
          <Image
            src={"/whatsapp-icon.svg"}
            alt="WhatsApp Icon"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </Button>
      <Button
        className="w-1/2 flex-1 space-x-2"
        onClick={() => {
          window.open(`tel:${phoneNumber}`);
        }}
      >
        <span>Call Owner</span>
        <PhoneOutgoing className="h-5 w-5" />
      </Button>
    </div>
  );
}
