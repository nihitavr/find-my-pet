import HeroSection from "../components/landing-page/hero-section";
import BenefitsSection from "../components/landing-page/benefits-section";
import HowItWorks from "../components/landing-page/steps-to-pet-security-section";
import Features from "../components/landing-page/features-section";
import OurCollectionSection from "~/components/landing-page/our-collection-section";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OurCollectionSection />
      <BenefitsSection />
      <HowItWorks />
      <Features />
    </main>
  );
}
