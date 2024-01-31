import HeroSection from "../components/landing-page/hero-section";
import BenefitsSection from "../components/landing-page/benefits-section";
import HowItWorks from "../components/landing-page/steps-to-pet-security-section";
import Features from "../components/landing-page/features-section";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <BenefitsSection />
      <HowItWorks />
      <Features />
    </main>
  );
}
