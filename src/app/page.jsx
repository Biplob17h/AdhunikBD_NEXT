import CategoriesSection from "@/components/screens/home/categories";
import FaqSection from "@/components/screens/home/faqs";
import ForHomeSectionSlider from "@/components/screens/home/for-home";
import GallerySlider from "@/components/screens/home/gallery";
import HeroSection from "@/components/screens/home/hero";
import RecommendedSection from "@/components/screens/home/recommended";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ForHomeSectionSlider />
      <RecommendedSection />
      <GallerySlider />
      <FaqSection />
    </>
  );
};

export default HomePage;
