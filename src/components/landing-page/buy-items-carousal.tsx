"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn, getDiscountedPrice } from "~/lib/utils";
import Link from "next/link";
import { type Product } from "@prisma/client";

export default function BuyItemsCarousal({
  productInfos,
  className,
  imageClassName,
}: {
  productInfos: Product[];
  className: string;
  imageClassName?: string;
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const itemOneImageRef = useRef<HTMLAnchorElement | null>(null);
  const [navButtonHeightOffset, setNavButtonHeightOffset] = useState(0);

  useEffect(() => {
    if (itemOneImageRef.current) {
      setNavButtonHeightOffset(itemOneImageRef.current.clientHeight / 2);
    }
  }, [itemOneImageRef.current]);

  return (
    <Carousel
      setApi={setCarouselApi}
      className="relative h-full w-full"
      opts={{
        dragFree: true,
      }}
    >
      <CarouselContent className={cn("-ml-1", className)}>
        {productInfos.map((product, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "h-full basis-1/2 items-center pl-2 md:basis-1/4 lg:basis-1/5",
            )}
          >
            <div className="flex h-full w-full flex-col gap-3 p-1">
              <Link
                href={`/product/${product.id}`}
                ref={index == 0 ? itemOneImageRef : undefined}
                className={cn(
                  "relative h-full w-full hover:scale-105 hover:cursor-pointer",
                  imageClassName,
                )}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={product.images[0]!}
                  alt={`${product.name} image`}
                  className={cn("h-full w-full", imageClassName)}
                />
              </Link>
              <div>
                <span className="break-words text-sm font-semibold">
                  {product.name}
                </span>
                <div className="flex items-center gap-3 font-semibold text-foreground/90">
                  <span className="line-through">&#8377; {product.price}</span>
                  <span className="text-primary">
                    &#8377;{" "}
                    {getDiscountedPrice(product.price, product.discount)}
                  </span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        onClick={() => carouselApi?.scrollPrev()}
        style={{ top: navButtonHeightOffset }}
        className={cn(
          "absolute ml-1 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border bg-gray-200 hover:bg-gray-100",
          navButtonHeightOffset ? "" : "hidden",
        )}
      >
        <ChevronLeft />
      </div>
      <div
        onClick={() => carouselApi?.scrollNext()}
        style={{ top: navButtonHeightOffset }}
        className={cn(
          "absolute right-0 mr-1 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-lg border bg-gray-200 hover:bg-gray-100",
          navButtonHeightOffset ? "" : "hidden",
        )}
      >
        <ChevronRight />
      </div>
    </Carousel>
  );
}
