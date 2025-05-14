import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import ThreeStepSummary from "@/components/ThreeStepSummary";
import ComparisonSnapshot from "@/components/ComparisonSnapshot";
import ValueProposition from "@/components/ValueProposition";
import FeaturePreview from "@/components/FeaturePreview";

export default function Home() {
  return (
    <>
      {/* Background effect */}
      <ParticleBackground />

      {/* Main content */}
      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Three-Step Summary */}
        <ThreeStepSummary />

        {/* Comparison Snapshot */}
        <ComparisonSnapshot />

        {/* Feature Preview */}
        <FeaturePreview />

        {/* Value Proposition */}
        <ValueProposition />
      </div>
    </>
  );
}
