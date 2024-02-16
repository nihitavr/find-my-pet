"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

import Image from "next/image";
import { cn } from "~/lib/utils";

export default function ProductImageCasousel({
  images,
  defaultImage = "",
  className,
  imageClassName,
}: {
  images: string[];
  defaultImage?: string;
  className?: string;
  imageClassName?: string;
  autoplay?: boolean;
  autoPlayDelay?: number;
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [thumbnailsCarouselApi, setThumbnailsCarouselApi] =
    useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
      thumbnailsCarouselApi?.scrollTo(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <Carousel className="h-full w-full" setApi={setCarouselApi}>
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem className={cn("relative", className)} key={index}>
            <Image
              src={imageUrl ? imageUrl : defaultImage}
              alt="Profile Image"
              fill
              style={{ objectFit: "contain" }}
              className={cn("p-5", imageClassName)}
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <Carousel
          className="h-full w-full"
          setApi={setThumbnailsCarouselApi}
          opts={{
            dragFree: true,
          }}
        >
          <CarouselContent className="ml-0">
            {images.map((imageUrl, index) => (
              <CarouselItem
                className={`aspect-square basis-1/4 p-1`}
                key={index}
                onClick={() => {
                  carouselApi?.scrollTo(index);
                }}
              >
                <div
                  className={`${
                    current == index
                      ? "rounded-lg border-2 border-primary"
                      : "rounded-lg border-2"
                  } relative flex aspect-square items-center justify-center`}
                >
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl ? imageUrl : defaultImage}
                    alt="Profile Image"
                    loading="lazy"
                    className="p-2"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </Carousel>
  );
}
