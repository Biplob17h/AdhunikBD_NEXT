import { StarIcon, TweeterIcon } from "@/components/ui/svgs";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const CategoryHeroBanner = ({ category }) => {
  
  return (
    <section className="pb-8 xl:pb-16">
      <div className="container_fluid">
        <div
          className="h-full w-full border-t-[3px] border-primary bg-primary bg-cover bg-center p-6 lg:h-[333px] xl:p-8"
          style={{ backgroundImage: `url(${category?.photo})` }}
        >
          <div className="max-w-[1023px] space-y-4">
            <div className="flex flex-wrap items-center gap-4 lg:gap-8">
              <h2 className="text-2xl font-semibold leading-[32px] text-white lg:text-[32px]">
                {category?.category}
              </h2>
            </div>
            <p className="max-w-[587px] text-base font-light leading-[32px] text-white">
              Reliable, professional, affordable, efficient, trusted, skilled,
              quality, responsive, certified, guaranteed, experienced,
              sustainable, modern
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeroBanner;
