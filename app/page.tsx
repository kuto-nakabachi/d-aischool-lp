"use client";

import React from "react";
import {
  Hero,
  Pain,
  Agitation,
  Target,
  CaseStudies,
  Benefits,
  FAQ,
  Footer,
  StickyCTA,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="font-sans text-gray-800 bg-gray-50 antialiased selection:bg-orange-200">
      <Hero />
      <Pain />
      <Agitation />
      <Target />
      <CaseStudies />
      <Benefits />
      <FAQ />
      <Footer />
      <StickyCTA />
    </div>
  );
}
