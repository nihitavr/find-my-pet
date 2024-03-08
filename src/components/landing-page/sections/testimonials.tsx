import TestimonialCarousel from "./testimonials-carousel";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sam",
      image: "/dog-avatar.jpeg",
      testimonial:
        "The FindMyPet QR tag is a game-changer for my dog, Mars. It's durable, easy to scan, and provides peace of mind knowing he can be quickly identified if lost. Highly recommend!",
    },
    {
      name: "Rahul",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I love the FindMyPet QR tag for its stylish, durable, and functional design. It looks great on my dog's collar and keeps him safe. A top-notch product!",
    },
    {
      name: "Prashant",
      image: "/cat-avatar.jpeg",
      testimonial:
        "The FindMyPet QR tag is essential for pet owners. It gives peace of mind for my indoor-outdoor cat, Natsu, when he's exploring. Easy to set up and great customer experience.",
    },
    {
      name: "Raj",
      image: "/cat-avatar.jpeg",
      testimonial:
        "I bought the FindMyPet QR tag for my cat, Smokey, who often runs away at my friend's place. It's an easy and effective way to ensure his safety if someone finds him.",
    },
    {
      name: "Amit",
      image: "/dog-avatar.jpeg",
      testimonial:
        "I can now feel safe that my pet is safe and secure with the pet tag from Find My Pet. The tag is of great quality and the design is so cute.",
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
