import CategoriesSection from "@/components/screens/home/categories";
import ForHomeSectionSlider from "@/components/screens/home/for-home";
import HeroSection from "@/components/screens/home/hero";
import RecommendedSection from "@/components/screens/home/recommended";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ForHomeSectionSlider />
      <RecommendedSection />
    </>
  );
};

export default HomePage;
