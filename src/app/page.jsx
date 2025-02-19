"use client";
import { useEffect, useState } from "react";
import AdsBannerSection from "@/components/screens/home/app-ads";
import CategoriesSection from "@/components/screens/home/categories";
import ClientFeedbackSection from "@/components/screens/home/client-feedbacks";
import FaqSection from "@/components/screens/home/faqs";
import ForHomeSectionSlider from "@/components/screens/home/for-home";
import GallerySlider from "@/components/screens/home/gallery";
import HeroSection from "@/components/screens/home/hero";
import HowWorkSection from "@/components/screens/home/how-works";
import RecommendedSection from "@/components/screens/home/recommended";
import FooterSection from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";
import useUser from "@/hooks/UserHook";
import Loading from "./loading";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [routeLoading, setRouteLoading] = useState(true);
  const router = useRouter();
  const { user, loading, setLoading } = useUser();

  useEffect(() => {
    if (!loading && user?.phone && user?.role === "vendor") {
      setRouteLoading(true);
      router.push("/dashboard/vendor");
      setRouteLoading(false);
      return;
    }
  }, [loading, user]); 

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <ForHomeSectionSlider />
      <RecommendedSection />
      <GallerySlider />
      <FaqSection />
      <HowWorkSection />
      <ClientFeedbackSection />
      <AdsBannerSection />
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
