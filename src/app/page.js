import Hero from "@/components/Hero";
import CoursesCarousel from "@/components/CoursesCarousel";
import Features from "@/components/Features";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import LumiSection from "@/components/Lumi";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <LumiSection />
      <Partners />
      <CoursesCarousel />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
