import HeroSection from "../components/landing-page/sections/hero-section";
import PawsomeFeatures from "../components/landing-page/sections/pawsome-features-section";
import OurCollectionSection from "~/components/landing-page/sections/our-collection-section";
import HowToGetStarted from "~/components/landing-page/how-to-get-started";
import WhatsAppButton from "~/components/landing-page/whats-app-contact-button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OurCollectionSection />
      <PawsomeFeatures />
      <HowToGetStarted />
      <WhatsAppButton />
    </main>
  );
}
