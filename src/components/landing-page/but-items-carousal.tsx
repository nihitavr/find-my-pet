"use client";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function ButItemsCarousal({
  shopItemsPrefixes,
}: {
  shopItemsPrefixes: string[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  return (
    <Carousel
      className="relative w-[100%] pt-5 md:pt-8"
      setApi={setCarouselApi}
    >
      <CarouselContent className="">
        {shopItemsPrefixes.map((petName, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-square items-center justify-center p-6">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={`/shop/${petName}-tag-front.jpeg`}
                    alt={`${petName} image`}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        onClick={() => carouselApi?.scrollPrev()}
        className={cn(
          "absolute top-1/2 ml-1 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-md border bg-gray-200 hover:bg-gray-100",
        )}
      >
        <ChevronLeft />
      </div>
      <div
        onClick={() => carouselApi?.scrollNext()}
        className={cn(
          "absolute right-0 top-1/2 mr-1 flex h-8 w-8 translate-x-1/2 items-center justify-center rounded-md border bg-gray-200 hover:bg-gray-100",
        )}
      >
        <ChevronRight />
      </div>
    </Carousel>
  );
}
