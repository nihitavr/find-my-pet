"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

import { Card, CardContent } from "~/components/ui/card";
import Image from "next/image";

export default function PetProfileCasousel({
  profileImages,
  petType,
}: {
  profileImages: string[];
  petType: string;
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  return (
    <Carousel setApi={setCarouselApi} className="relative w-full">
      <CarouselContent>
        {profileImages.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="md:rounded-t-md">
                <CardContent className="relative aspect-square w-full">
                  <Image
                    src={
                      imageUrl
                        ? imageUrl
                        : petType === "dog"
                          ? "/dog-avatar.jpeg"
                          : "/cat-avatar.jpeg"
                    }
                    alt="Profile Image"
                    fill
                    style={{ objectFit: "cover" }}
                    className="md:rounded-t-md"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
        {profileImages.length > 1 &&
          profileImages.map((_, idx) => {
            return (
              <div
                className={`h-2 w-2 rounded-full ${
                  idx + 1 === current ? "bg-gray-500" : "bg-gray-300"
                }`}
                key={idx}
              />
            );
          })}
      </div>
    </Carousel>
  );
}
