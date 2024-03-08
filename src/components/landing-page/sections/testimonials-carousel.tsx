"use client";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TestimonialCarousel = ({
  testimonials,
}: {
  testimonials: {
    name: string;
    image: string;
    testimonial: string;
  }[];
}) => {
  return (
    <Carousel
      plugins={[
        WheelGesturesPlugin(),
        Autoplay({
          delay: 3000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        containScroll: "trimSnaps",
      }}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="p-2 md:basis-1/3">
            <div className="flex h-full flex-col items-center gap-3  rounded-xl border bg-white px-5 py-10 shadow-md">
              <div className="relative h-24 w-24 rounded-full bg-accent">
                <Image
                  fill
                  src={testimonial.image}
                  alt="user image"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <span className="text-center font-semibold">
                {testimonial.name}
              </span>
              <p className="text-center">{testimonial.testimonial}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TestimonialCarousel;
