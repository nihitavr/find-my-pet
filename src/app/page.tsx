import HeroSection from "../components/landing-page/hero-section";
import HowItWorks from "../components/landing-page/steps-to-pet-security-section";
import Features from "../components/landing-page/features-section";
import OurCollectionSection from "~/components/landing-page/our-collection-section";
import PawsomeProfilesSection from "~/components/landing-page/pawsome-profiles-section";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OurCollectionSection />
      <PawsomeProfilesSection />
      <HowItWorks />
      <Features />
    </main>
  );
}
