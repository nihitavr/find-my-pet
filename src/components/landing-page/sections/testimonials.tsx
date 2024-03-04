import TestimonialCarousel from "./testimonials-carousel";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Nihit",
      image: "/dog-avatar.jpeg",
      testimonial:
        "Love the pet tag from Find My Pet, the quality is amazing and the design is so cute. I would recommend it to all pet owners.",
    },
    {
      name: "Prashant",
      image: "/cat-avatar.jpeg",
      testimonial:
        "I can now feel safe that my pet is safe and secure with the pet tag from Find My Pet. The tag is of great quality and the design is so cute.",
    },
    {
      name: "Raj",
      image: "/dog-avatar.jpeg",
      testimonial:
        "The pet tag from Find My Pet is of great quality and the design is so cute. I would recommend it to all pet owners.",
    },
    {
      name: "Rahul",
      image: "/cat-avatar.jpeg",
      testimonial:
        "Love the pet tag from Find My Pet, the quality is amazing and the design is so cute. I would recommend it to all pet owners.",
    },
    {
      name: "Amit",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I can now feel safe that my pet is safe and secure with the pet tag from Find My Pet. The tag is of great quality and the design is so cute.",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-accent px-5 py-8 md:gap-10 md:px-28 md:py-10">
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:min-h-14 md:text-5xl">
        Testimonials
      </h1>
      <div className="w-full">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
