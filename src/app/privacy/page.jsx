import PrivacySection from "@/components/screens/privacy/privacy";
import HeaderSection from "@/components/shared/header";

const PrivacyPage = () => {
  return (
    <>
      <HeaderSection
        title="Privacy Policy"
        links={["Home", "Privacy Policy"]}
      />
      <PrivacySection />
    </>
  );
};

export default PrivacyPage;
