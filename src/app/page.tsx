import HeroSection from "../components/landing-page/sections/hero";
import OurCollectionSection from "~/components/landing-page/sections/our-collection";
import HowToGetStarted from "~/components/landing-page/sections/how-to-get-started";
import WhatsAppButton from "~/components/landing-page/whats-app-contact-button";
import PawsomeFeatures from "~/components/landing-page/sections/pawsome-features";
import OurInspirationSection from "~/components/landing-page/sections/our-inspiration";
import Testimonials from "~/components/landing-page/sections/testimonials";
import Footer from "~/components/landing-page/sections/footer";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <OurCollectionSection />
      <PawsomeFeatures />
      <HowToGetStarted />
      <OurInspirationSection />
      <Testimonials />
      <Footer />
      <div className="h-20 md:h-0" />
      <WhatsAppButton />
    </main>
  );
}
