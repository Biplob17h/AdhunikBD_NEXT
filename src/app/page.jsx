import AdsBannerSection from "@/components/screens/home/app-ads";
import CategoriesSection from "@/components/screens/home/categories";
import ClientFeedbackSection from "@/components/screens/home/client-feedbacks";
import FaqSection from "@/components/screens/home/faqs";
import ForHomeSectionSlider from "@/components/screens/home/for-home";
import GallerySlider from "@/components/screens/home/gallery";
import HeroSection from "@/components/screens/home/hero";
import HowWorkSection from "@/components/screens/home/how-works";
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
      <HowWorkSection />
      <ClientFeedbackSection />
      <AdsBannerSection />
    </>
  );
};

export default HomePage;
