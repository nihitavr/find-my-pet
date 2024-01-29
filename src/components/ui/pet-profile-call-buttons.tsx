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
import { toast } from "./use-toast";
import { useEffect } from "react";
import { api } from "~/lib/trpc/react";

export default function OnwerInfoButtons({
  phoneNumber,
  petTagId,
}: {
  phoneNumber?: string;
  petTagId: string;
}) {
  const petTagMutate = api.petTag.recordScan.useMutation();

  useEffect(() => {
    if (navigator.geolocation && petTagId) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          petTagMutate.mutate({
            petTagId,
            geoCode: { latitude, longitude },
          });
        },
        () => {
          return;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    }
  }, []);

  return (
    <div className="pt-2">
      <span className="text-xs font-semibold leading-3">
        Found Pet? Share your location or Call Owner.*
      </span>
      <div className="grid grid-cols-12 gap-2">
        <Button
          variant={"outline"}
          className="col-span-5 gap-1 text-green-900 hover:bg-green-50"
          onClick={() => {
            // Get geolocation
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  window.open(
                    `${WHATSAPP_URL}${phoneNumber}?text=Hi, I found your pet! I am currently at this location. %0A%0Ahttps://www.google.com/maps/search/${latitude},${longitude}`,
                  );
                },
                () => {
                  toast({
                    variant: "failure",
                    description:
                      "Error getting geolocation on this browser. Please try another browser.",
                  });
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
              );
            } else {
              toast({
                variant: "failure",
                description:
                  "Geolocation is not supported by this browser. Please try another browser.",
              });
            }
          }}
        >
          <span className="truncate">Location </span>
          <div className="relative h-3.5 w-3.5">
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
          className="col-span-5 gap-1"
          onClick={() => {
            window.open(`tel:${phoneNumber}`);
          }}
        >
          <span>Call Owner</span>
          <PhoneOutgoing className="h-3.5 w-3.5" />
        </Button>

        <Popover>
          <PopoverTrigger asChild className="col-span-2 w-full">
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
