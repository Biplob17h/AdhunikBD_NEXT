import { StarIcon, TweeterIcon } from "@/components/ui/svgs";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const CategoryHeroBanner = ({ category }) => {
  console.log(category);
  return (
    <section className="pb-8 xl:pb-16">
      <div className="container_fluid">
        <div
          className="border-t-[3px] border-primary bg-cover bg-center p-6 xl:p-8 h-full w-full bg-primary lg:h-[333px]"
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
            <div className="flex flex-wrap items-center gap-7">
              <button className="inline-flex max-h-[45px] items-center justify-center rounded-lg bg-white px-6 py-2 text-lg font-semibold uppercase leading-[32px] text-black/75">
                Add to favorites
              </button>
              <p className="inline-flex flex-wrap items-center gap-2 text-white">
                <span className="font-inter text-[26px] font-extrabold leading-[48px]">
                  4.5
                </span>
                <span className="inline-flex items-center gap-0.5 font-extrabold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} />
                  ))}
                </span>
                <span className="text-2xl font-medium">(24 Reviews)</span>
              </p>
            </div>
            <div className="h-[1px] w-full bg-[#77A1D3]" />{" "}
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex items-center gap-4">
                <MapPin className="h-8 w-8 rounded bg-white p-1.5" />
                <p className="text-lg font-light text-white">
                  62/2, purana paltan (2nd floor), 1000
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 -rotate-90 rounded bg-white p-1.5" />
                <Link
                  href="tel:+8801517903020"
                  className="text-lg font-light text-white"
                >
                  +880 1517903020
                </Link>
              </div>{" "}
              <div className="flex items-center gap-4">
                <Mail className="h-8 w-8 rounded bg-white p-1.5" />
                <Link
                  href="mailto:pixels@service.com"
                  className="text-lg font-light text-white"
                >
                  pixels@service.com
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link href="https://www.facebook.com/pixels">
                  <Facebook className="h-8 w-8 rounded bg-white p-1.5 text-black/75" />
                </Link>{" "}
                <Link href="https://www.twitter.com/pixels">
                  <TweeterIcon className="h-8 w-8 rounded bg-white p-1.5 text-black/75" />
                </Link>{" "}
                <Link href="https://www.linkedin.com/in/pixels">
                  <Linkedin className="h-8 w-8 rounded bg-white p-1.5 text-black/75" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeroBanner;
