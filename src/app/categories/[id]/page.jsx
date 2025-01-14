import DetailTabSection from "@/components/screens/category-details/detail-tabs";
import CategoryHeroBanner from "@/components/screens/category-details/hero";
import AdsBannerSection from "@/components/screens/home/app-ads";

const CategoriesDetailsPage = () => {
  return (
    <>
      <CategoryHeroBanner />
      <DetailTabSection />
      <AdsBannerSection />
    </>
  );
};

export default CategoriesDetailsPage;
