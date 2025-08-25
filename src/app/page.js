import Hero from "@/components/Hero";
import CoursesCarousel from "@/components/CoursesCarousel";
import Features from "@/components/Features";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Partners />
      <CoursesCarousel />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
