import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DocumentsSection } from "@/components/landing/DocumentsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <LandingNav />
    <HeroSection />
    <FeaturesSection />
    <DocumentsSection />
    <PricingSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
