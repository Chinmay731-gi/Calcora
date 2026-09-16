import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AdPlaceholder from "@/components/AdPlaceholder";
import CalculatorGrid from "@/components/CalculatorGrid";
import EmiCalculator from "@/components/calculators/EmiCalculator";
import GstCalculator from "@/components/calculators/GstCalculator";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import SipCalculator from "@/components/calculators/SipCalculator";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import WhyUse from "@/components/WhyUse";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import SeoContent from "@/components/SeoContent";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />

      <div className="bg-offwhite py-8">
        <AdPlaceholder label="Below hero" />
      </div>

      <CalculatorGrid />
      <EmiCalculator />
      <GstCalculator />

      <div className="bg-white py-8">
        <AdPlaceholder label="Between calculators" />
      </div>

      <SalaryCalculator />
      <SipCalculator />
      <AgeCalculator />
      <PercentageCalculator />
      <LoanCalculator />
      <WhyUse />
      <HowItWorks />

      <div className="bg-offwhite py-8">
        <AdPlaceholder label="Before FAQ" />
      </div>

      <FAQ />
      <SeoContent />

      <div className="bg-navy py-8">
        <AdPlaceholder label="Near footer" dark />
      </div>

      <Footer />
    </main>
  );
}
