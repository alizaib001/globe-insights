// Importing necessary components from the respective paths
import { HomeCategories } from "@/components/homePage/homeCategory/HomeCategories";
import TopNews from "@/components/homePage/topNews/TopNews";
import { HeroSection } from "@/components/homePage/heroSection/HeroSection";

// Define and export the Home component
export default function Home() {
  return (
    // Main container with full width styling
    <main className="w-full">
      {/* Hero section at the top of the homepage */}
      <HeroSection />
      {/* Top News section */}
      <TopNews />
      {/* Home Categories section */}
      <HomeCategories />
    </main>
  );
}
