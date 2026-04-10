import BoardingPassCarousel from "@/components/BoardingPassCarousel";
import PassportSection from "@/components/PassportSection";
import PostcardContact from "@/components/PostcardContact";
import TravelFooter from "@/components/TravelFooter";
import TravelHeroSection from "@/components/TravelHeroSection";
import TravelNavigation from "@/components/TravelNavigation";

export default function Home() {
  return (
    <div className="min-h-screen paper-texture" style={{ backgroundColor: "#F5F5DC" }}>
      <TravelNavigation />
      <TravelHeroSection />
      <BoardingPassCarousel />
      <PassportSection />
      <PostcardContact />
      <TravelFooter />
    </div>
  );
}

