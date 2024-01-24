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

export default function PhotoCasousel({
  images,
  defaultImage,
  className,
  imageClassName,
}: {
  images: string[];
  defaultImage: string;
  className?: string;
  imageClassName?: string;
  autoplay?: boolean;
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
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="h-full w-full"
      setApi={setCarouselApi}
    >
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className={cn("relative w-full", className)}>
                  <Image
                    src={imageUrl ? imageUrl : defaultImage}
                    alt="Profile Image"
                    fill
                    style={{ objectFit: "cover" }}
                    className={imageClassName}
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {images.length > 1 &&
          images.map((_, idx) => {
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
