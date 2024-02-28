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
import { useMediaQuery } from "~/lib/hooks/screen.hooks";

export default function BuyItemsCarousal({
  productInfos,
  className,
  imageClassName,
}: {
  productInfos: Product[];
  className: string;
  imageClassName?: string;
}) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const itemOneImageRef = useRef<HTMLAnchorElement | null>(null);
  const [navButtonHeightOffset, setNavButtonHeightOffset] = useState(0);

  const [hoverIndices, setHoverIndices] = useState<number[]>([]);

  useEffect(() => {
    setHoverIndices(Array(productInfos.length).fill(0));
  }, [productInfos.length]);

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
              onMouseEnter={(e) => {
                setHoverIndices((prev) => {
                  prev[index] = 1;
                  return [...prev];
                });
              }}
              onMouseLeave={(e) => {
                setHoverIndices((prev) => {
                  prev[index] = 0;
                  return [...prev];
                });
              }}
              href={getProductRelativeUrl(product)}
              ref={index == 0 ? itemOneImageRef : undefined}
              className={cn(
                "relative h-full w-full hover:cursor-pointer",
                imageClassName,
              )}
            >
              <>
                <Image
                  key={`image-0-${index}`}
                  fill
                  style={{ objectFit: "contain" }}
                  src={productInfos[index]!.images[0]!}
                  alt={`${productInfos[index]?.name} image`}
                  className={cn(
                    "h-full w-full animate-[fade-in_0.5s_linear]",
                    imageClassName,
                  )}
                />
                {!isMobile && hoverIndices[index] === 1 && (
                  <Image
                    key={`image-1-${index}`}
                    fill
                    style={{ objectFit: "contain" }}
                    src={productInfos[index]!.images[1]!}
                    alt={`${productInfos[index]?.name} image`}
                    className={cn(
                      "h-full w-full animate-[fade-in_0.1s_linear]",
                      imageClassName,
                    )}
                  />
                )}
              </>
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
