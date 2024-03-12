import TestimonialCarousel from "./testimonials-carousel";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sam",
      image: "/dog-avatar.jpeg",
      testimonial:
        "The tag is a game-changer for my dog, Mars. It's durable, easy to scan, and provides peace of mind knowing he can be quickly identified if lost.",
    },
    {
      name: "Rahul",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I love the qr tag for its stylish, durable, and functional design. It looks great on my dogs collar and keeps him safe. A top-notch product!",
    },
    {
      name: "Prashant",
      image: "/cat-avatar.jpeg",
      testimonial:
        "The pet tag is essential for pet owners. It gives peace of mind for my indoor outdoor cat, Natsu, when he's exploring. Easy to set up and great customer experience.",
    },
    {
      name: "Raj",
      image: "/cat-avatar.jpeg",
      testimonial:
        "I bought the their Qr tag for my cat, Smokey, who often runs away at my friend's place. It's an easy and effective way to ensure his safety if someone finds him.",
    },
    {
      name: "Amit",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I can now feel safe that my pet is safe and secure with the pet tag from Find My Pet. The tag is of great quality and the design is so cute.",
    },
    {
      name: "Malavika Mukherjee",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I wasn't sure if a QR tag could be tough, but Find My Pet proved me wrong! My playful dog, Uno, loves batting at his tag, but it's held up without a scratch. I'm impressed with the quality and the choice of designs offered.",
    },
    {
      name: "Gaurav Israni",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I love being able to update Lazarous profile with his details. I know anyone who finds him can access all his important info.",
    },
    {
      name: "Chumki Sarkar",
      image: "/cat-avatar.jpeg",
      testimonial:
        "The lost pet alert feature on Find My Pet is a game changer! Knowing I'll be notified immediately if someone scans my cat's tag gives me incredible peace of mind.",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-10 bg-accent px-5 py-8 md:gap-10 md:px-28 md:py-14">
      <h1 className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-center text-3xl font-semibold text-transparent md:min-h-14 md:text-5xl">
        Testimonials
      </h1>
      <div className="w-full">
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
