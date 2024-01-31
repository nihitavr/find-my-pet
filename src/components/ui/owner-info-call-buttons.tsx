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
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function OwnerInfoButtons({
  phoneNumber,
  petId,
  petTagId,
}: {
  phoneNumber?: string;
  petId: string;
  petTagId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const petTagMutate = api.petTag.recordScan.useMutation();

  useEffect(() => {
    if (
      navigator.geolocation &&
      petTagId &&
      searchParams.get("recordLocation") != "false"
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          petTagMutate.mutate({
            petId,
            petTagId,
            geoCode: { latitude, longitude },
          });

          // Add recordLocation=false to url, so that we don't keep recording location.
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("recordLocation", "false");
          router.replace(`${pathname}?${newSearchParams.toString()}`);
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
          className="col-span-5 gap-1 text-green-900 hover:bg-green-50 md:w-full"
          onClick={() => {
            // Get geolocation
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;

                  // In IOS window.open doesn't work without setTimeout. setTimeout executes on the main thread so it works.
                  setTimeout(() => {
                    window.open(
                      `${WHATSAPP_URL}${phoneNumber}?text=Hi, I found your pet! I am currently at this location. %0A%0Ahttps://www.google.com/maps/search/${latitude},${longitude}`,
                      "_blank",
                    );
                  });
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
          className="col-span-5 gap-1 md:w-full"
          onClick={() => {
            window.open(`tel:${phoneNumber}`);
          }}
        >
          <span>Call Owner</span>
          <PhoneOutgoing className="h-3.5 w-3.5" />
        </Button>

        <Popover>
          <PopoverTrigger asChild className="col-span-2 !w-full">
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
