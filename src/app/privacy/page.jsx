import AdsBannerSection from "@/components/screens/home/app-ads";
import PrivacySection from "@/components/screens/privacy/privacy";
import HeaderSection from "@/components/shared/header";
import Navbar from "@/components/shared/navbar";

const PrivacyPage = () => {
  return (
    <>
      <Navbar />
      <HeaderSection
        title="Privacy Policy"
        links={["Home", "Privacy Policy"]}
      />
      <PrivacySection />
      <AdsBannerSection />
    </>
  );
};

export default PrivacyPage;
