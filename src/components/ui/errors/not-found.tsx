const MESSAGES = [
  "We sniffed around but couldn't find your bone. Are you sure it's buried here?",
  "This page must have gone on a walk without a leash. We can't find it!",
  "Our server played fetch, but the page you're looking for didn't come back.",
  "You've caught the scent of a page that's lost in the woods. No tracks here!",
  "Looks like the cat's got this page! We can't find it anywhere.",
  "This page is having a cat nap. We can't find it anywhere!",
];

export default function NotFound() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="text-3xl font-semibold">404</div>
      <div className="text-center text-xl font-semibold px-3">
        {MESSAGES[Math.floor(Math.random() * MESSAGES.length)]}
      </div>
    </div>
  );
}
