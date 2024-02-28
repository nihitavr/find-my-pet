import HeroSection from "../components/landing-page/sections/hero";
import OurCollectionSection from "~/components/landing-page/sections/our-collection";
import HowToGetStarted from "~/components/landing-page/sections/how-to-get-started";
import WhatsAppButton from "~/components/landing-page/whats-app-contact-button";
import PawsomeFeatures from "~/components/landing-page/sections/pawsome-features";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OurCollectionSection />
      <PawsomeFeatures />
      <HowToGetStarted />
      <div className="h-32" />
      <WhatsAppButton />
    </main>
  );
}
