import Image from "next/image";

const MESSAGES = [
  "Paws right there! You need a purr-mission slip to get through this cat flap.",
  "You must be kitten me! You need to be part of the pack to see this content.",
  "This doghouse is members-only. Please fetch the right credentials.",
  "You're barking up the wrong tree without proper credentials.",
  "Looks like you're chasing your tail. You need to be part of the pack to see this content.",
];

export default function Unauthorised() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="relative h-60 w-96">
        <Image
          layout="fill"
          style={{ objectFit: "contain" }}
          src="/errors/unauthorised.svg"
          alt="Unauthorised 401"
        />
      </div>
      <div className="px-3 text-center text-xl font-semibold">
        {MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}
      </div>
    </div>
  );
}
