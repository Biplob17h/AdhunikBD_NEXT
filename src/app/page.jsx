import CategoriesSection from "@/components/screens/home/categories";
import ForHomeSectionSlider from "@/components/screens/home/for-home";
import HeroSection from "@/components/screens/home/hero";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ForHomeSectionSlider />
    </>
  );
};

export default HomePage;
