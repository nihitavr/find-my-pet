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
import { cn } from "~/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function ProductImageCasousel({
  images,
  defaultImage = "",
  className,
  imageClassName,
  autoplay = false,
  autoPlayDelay = 4000,
}: {
  images: string[];
  defaultImage?: string;
  className?: string;
  imageClassName?: string;
  autoplay?: boolean;
  autoPlayDelay?: number;
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
    <Carousel
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: autoPlayDelay,
              }),
            ]
          : []
      }
      className="h-full w-full"
      setApi={setCarouselApi}
    >
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem className={cn("relative", className)} key={index}>
            <Image
              src={imageUrl ? imageUrl : defaultImage}
              alt="Profile Image"
              fill
              style={{ objectFit: "contain" }}
              className={cn(imageClassName)}
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex h-8 items-center justify-center gap-2">
        {images.length > 1 &&
          images.map((_, idx) => {
            return (
              <div
                className={`h-2 w-2 rounded-full ${
                  idx + 1 === current
                    ? "bg-primary"
                    : "border border-gray-400 bg-gray-300"
                }`}
                key={idx}
              />
            );
          })}
      </div>
    </Carousel>
  );
}