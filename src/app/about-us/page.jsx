import OurMissionSection from "@/components/screens/about/mission";
import WhyShebaSection from "@/components/screens/about/why-sheba";
import HeaderSection from "@/components/shared/header";
import Navbar from "@/components/shared/navbar";

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <HeaderSection title="About Us" links={["Home", "About Us"]} />
      <WhyShebaSection />
      <OurMissionSection />
    </>
  );
};

export default AboutUsPage;
