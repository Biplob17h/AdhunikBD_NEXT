import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailSection from "./details";
import FaqDetailSection from "./faq-details";
import ReviewDetailSection from "./reviews-detail";
import ServiceOverviewSection from "./service-overview";

const DetailTabSection = ({ subCategories, category }) => {
  console.log(subCategories)
  return (
    <section className="pb-16 xl:pb-32">
      <div className="container_fluid">
        <Tabs defaultValue="details">
          <TabsList className="sticky top-0 z-10 mb-4 w-full justify-normal gap-4 rounded-none border-b bg-white py-6 shadow-none lg:gap-14">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="service-overview">Service Overview</TabsTrigger>
            <TabsTrigger value="faqs">FAQ</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <DetailSection subCategories={subCategories} category={category} />
          </TabsContent>{" "}
          <TabsContent value="service-overview">
            <ServiceOverviewSection />
          </TabsContent>
          <TabsContent value="faqs">
            <FaqDetailSection />
          </TabsContent>{" "}
          <TabsContent value="reviews">
            <ReviewDetailSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DetailTabSection;
