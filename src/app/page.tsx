import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/lib/auth";
import { api } from "~/lib/trpc/server";
import HeroSection from "./_components/landing-page/hero-section";
import BenefitsSection from "./_components/landing-page/benefits-section";
import HowItWorks from "./_components/landing-page/steps-to-pet-security-section";
import Features from "./_components/landing-page/features-section";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="bg-primary text-primary flex min-h-screen flex-col">
      <HeroSection />
      <BenefitsSection />
      <HowItWorks />
      <Features />
    </main>
  );
}
