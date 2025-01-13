import WhyShebaSection from "@/components/screens/about/why-sheba";
import HeaderSection from "@/components/shared/header";

const AboutUsPage = () => {
  return (
    <>
      <HeaderSection title="About Us" links={["Home", "About Us"]} />
      <WhyShebaSection />
    </>
  );
};

export default AboutUsPage;
