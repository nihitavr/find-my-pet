"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { type Product } from "@prisma/client";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Price from "../ui/price";
import { getProductRelativeUrl } from "~/lib/utils/product.utils";

export default function BuyItemsCarousal({
  productInfos,
  className,
  imageClassName,
}: {
  productInfos: Product[];
  className: string;
  imageClassName?: string;
}) {
  const itemOneImageRef = useRef<HTMLAnchorElement | null>(null);
  const [navButtonHeightOffset, setNavButtonHeightOffset] = useState(0);

  useEffect(() => {
    if (itemOneImageRef.current) {
      setNavButtonHeightOffset(itemOneImageRef.current.clientHeight / 2);
    }
  }, [itemOneImageRef.current]);

  return (
    <Carousel
      className="relative h-full w-full"
      opts={{
        dragFree: true,
        containScroll: "trimSnaps",
      }}
      plugins={[WheelGesturesPlugin()]}
    >
      <CarouselContent className={className}>
        {productInfos.map((product, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "flex h-full basis-1/2 flex-col items-center gap-3 p-1 md:basis-1/4 lg:basis-1/5",
            )}
          >
            <Link
              href={getProductRelativeUrl(product)}
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
            <div className="= w-full">
              <span className="line-clamp-2 break-words text-sm font-semibold">
                {product.name}
              </span>

              <Price price={product.price} discount={product.discount} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Scroll Prev and Scroll Next */}
      <CarouselPrevious style={{ top: navButtonHeightOffset }} />
      <CarouselNext style={{ top: navButtonHeightOffset }} />
    </Carousel>
  );
}
