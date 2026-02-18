import { HeroSection } from "@/components/landing/hero-section";
import { LatestLessonsSection } from "@/components/landing/latest-lessons-section";
import { ProfileSection } from "@/components/landing/profile-section";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <LatestLessonsSection />
      <ProfileSection />
      <CTASection />
    </div>
  );
}
