import { BenefitsSection } from "@/components/benefits-section";
import { CtaSection } from "@/components/cta-section";
import { CustomizationSection } from "@/components/customization-section";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PlansSection } from "@/components/plans-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsSection />
      <HowItWorksSection />
      <PlansSection />
      <CustomizationSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
