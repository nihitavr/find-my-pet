import Link from "next/link";

import { getServerAuthSession } from "~/lib/auth";
import { api } from "~/lib/trpc/server";
import HeroSection from "../components/landing-page/hero-section";
import BenefitsSection from "../components/landing-page/benefits-section";
import HowItWorks from "../components/landing-page/steps-to-pet-security-section";
import Features from "../components/landing-page/features-section";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col bg-primary text-primary">
      <HeroSection />
      <BenefitsSection />
      <HowItWorks />
      <Features />
    </main>
  );
}
