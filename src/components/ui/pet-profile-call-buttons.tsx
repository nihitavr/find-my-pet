"use client";

import Image from "next/image";
import { Button } from "./button";
import { Copy, PhoneOutgoing } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { WHATSAPP_URL } from "~/lib/constants";

export default function PetProfileCallButtons({
  phoneNumber,
}: {
  phoneNumber?: string;
}) {
  return (
    <div className="pt-2">
      <span className="text-xs font-semibold leading-3">
        Found Pet? Share your location or Call Owner.*
      </span>
      <div className="flex gap-2">
        <Button
          className="w-5/12 flex-1 space-x-2 border border-green-700 bg-white text-green-900 hover:bg-green-50"
          onClick={() => {
            // Get geolocation
            navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              window.open(
                `${WHATSAPP_URL}${phoneNumber}?text=Hi, I found your pet! I am currently at this location. %0A%0Ahttps://www.google.com/maps/search/${latitude},${longitude}`,
              );
            });
          }}
        >
          <span className="truncate">Share Location</span>
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
          className="w-5/12 flex-1 space-x-2"
          onClick={() => {
            window.open(`tel:${phoneNumber}`);
          }}
        >
          <span>Call Owner</span>
          <PhoneOutgoing className="h-5 w-5" />
        </Button>

        <Popover>
          <PopoverTrigger asChild className="w-1/12">
            <Button
              className="w-full p-2"
              onClick={async () => {
                if (phoneNumber) {
                  await navigator?.clipboard?.writeText(phoneNumber);
                }
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-fit p-2">
            <p className="p-0 text-xs">Phone Number Copied</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
