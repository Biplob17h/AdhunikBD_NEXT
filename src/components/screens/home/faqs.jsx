import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs.data";

const FaqSection = () => {
  return (
    <section className="py-16 xl:py-32">
      <div className="container_fluid">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="block md:hidden lg:block">
            <img className="rounded-[32px]" src="/images/faq.png" alt="faq" />
          </div>
          <div className="space-y-4 rounded-[32px] bg-secondary p-6">
            <div className="space-y-4">
              <h6 className="text-sm text-black/75">WHY CHOOSE US</h6>
              <h2 className="text-3xl font-bold text-black/75 lg:text-[42px] lg:leading-none">
                We Care About Your Safety
              </h2>
              <p className="text-base font-light text-black/60">
                At Sheba, your safety and convenience are our top priorities. We
                partner with verified and skilled professionals to ensure the
                highest quality of service. From booking to completion, giving
                you peace of mind every step of the way.
              </p>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
