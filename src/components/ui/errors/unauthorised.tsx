const MESSAGES = [
  "Paws right there! You need a purr-mission slip to get through this cat flap.",
  "You must be kitten me! You need to be part of the pack to see this content.",
  "This doghouse is members-only. Please log in or fetch the right credentials.",
  "You're barking up the wrong tree without proper credentials. Please log in.",
  "Looks like your credentials are playing hide and seek. Please find them and try again.",
];

export default function Unauthorised() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="text-3xl font-semibold text-primary">401</div>
      <div className="px-3 text-center text-xl font-semibold">
        {MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}
      </div>
    </div>
  );
}
