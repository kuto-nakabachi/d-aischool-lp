"use client";

import React from "react";
import {
  Header,
  Hero,
  Pain,
  Target,
  CaseStudies,
  Benefits,
  FAQ,
  CTA,
  Footer,
  MobileCTA,
} from "@/components/sections";

export default function Home() {
  const scrollToCta = () => {
    const ctaSection = document.getElementById("cta-section");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 antialiased selection:bg-orange-200">
      <Header scrollToCta={scrollToCta} />
      <Hero scrollToCta={scrollToCta} />
      <Pain />
      <Target />
      <CaseStudies />
      <Benefits />
      <FAQ />
      <CTA />
      <Footer />
      <MobileCTA scrollToCta={scrollToCta} />
    </div>
  );
}
