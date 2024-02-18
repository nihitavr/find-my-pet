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
import { useMediaQuery } from "~/lib/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [thumbnailsCarouselApi, setThumbnailsCarouselApi] =
    useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());

      if (
        !thumbnailsCarouselApi
          ?.slidesInView()
          .includes(carouselApi.selectedScrollSnap())
      )
        thumbnailsCarouselApi?.scrollTo(carouselApi.selectedScrollSnap());
    });

    return () => {
      carouselApi.off("select", () => {
        return;
      });
    };
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
          className="relative w-full"
          setApi={setThumbnailsCarouselApi}
          opts={{
            dragFree: true,
            inViewThreshold: 0.5,
          }}
        >
          <CarouselContent className="ml-0">
            {images.map((imageUrl, index) => (
              <CarouselItem
                className={`aspect-square basis-1/4 p-1 md:basis-1/5`}
                key={index}
                onClick={() => {
                  carouselApi?.scrollTo(index);
                }}
                onMouseEnter={() => {
                  if (!isMobile.current) {
                    carouselApi?.scrollTo(index, true);
                  }
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
          {!isMobile.current && (
            <>
              {
                <div
                  onClick={() => carouselApi?.scrollPrev()}
                  className={cn(
                    "absolute top-1/2 ml-1 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border bg-gray-200 hover:bg-gray-100",
                  )}
                >
                  <ChevronLeft />
                </div>
              }
              <div
                onClick={() => carouselApi?.scrollNext()}
                className={cn(
                  "absolute right-0 top-1/2 mr-1 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-lg border bg-gray-200 hover:bg-gray-100",
                )}
              >
                <ChevronRight />
              </div>
            </>
          )}
        </Carousel>
      )}
    </Carousel>
  );
}
