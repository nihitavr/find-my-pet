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
import { useEffect, useState } from "react";
import { api } from "~/lib/trpc/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { toast } from "./use-toast";

export default function OwnerInfoButtons({
  phoneNumber,
  petId,
  qrCodeId,
  recordLocation,
}: {
  phoneNumber?: string;
  petId: string;
  qrCodeId: string;
  recordLocation?: boolean;
}) {
  const [whatsappLink, setWhatsappLink] = useState<string>("");
  const [fetchingGeoLocation, setFetchingGeoLocation] =
    useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const petTagMutate = api.petTag.recordScan.useMutation();

  useEffect(() => {
    if (navigator.geolocation && qrCodeId) {
      setFetchingGeoLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setWhatsappLink(
            `${WHATSAPP_URL}${phoneNumber}?text=Hi, I found your pet! I am currently at this location. %0A%0Ahttps://www.google.com/maps/search/${latitude},${longitude}`,
          );

          if (recordLocation) {
            petTagMutate.mutate({
              petId,
              qrCodeId,
              geoCode: { latitude, longitude },
            });

            // Add recordLocation=false to url, so that we don't keep recording location.
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("recordLocation", "false");
            router.replace(`${pathname}?${newSearchParams.toString()}`);
          }
          setFetchingGeoLocation(false);
        },
        () => {
          setFetchingGeoLocation(false);
          return;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    }
  }, []);

  return (
    <div className="pt-2">
      <span className="text-sm font-semibold text-red-600">
        Found Pet? Share your location or Call Owner.*
      </span>
      <div className="grid grid-cols-12 gap-2">
        <a
          onClick={(e) => {
            if (fetchingGeoLocation) {
              toast({
                title: "Please wait for your current location to be fetched.",
                variant: "default",
              });
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "col-span-5 inline-block",
            fetchingGeoLocation ? "pointer-events-none1 opacity-80" : "",
          )}
        >
          <Button
            variant={"outline"}
            className="w-full gap-1 text-green-900 hover:bg-green-50 md:w-full"
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
        </a>
        <Button
          className="col-span-5 gap-1 md:w-full"
          onClick={() => {
            window.open(`tel:${phoneNumber}`, "_self");
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
