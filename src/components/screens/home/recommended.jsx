import { recommendedServices } from "@/data/recommended.data";
import Link from "next/link";

const RecommendedSection = () => {
  return (
    <section className="pb-16 xl:pb-32">
      <div className="container_fluid">
        <div className="heading mx-auto max-w-[855px] text-center">
          <h2 className="text-3xl font-bold text-black/75 md:text-[42px] md:leading-none">
            Recommended
          </h2>
        </div>

        {/* Dynamically render services */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedServices.slice(0, 4).map((service) => (
            <Link
              key={service.id}
              href={`/categories/${service.id}`}
              className="group inline-block cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={service.image}
                  className="h-full w-full rounded-xl object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                  alt={service.name}
                />
              </div>
              <p className="text-xs font-bold text-black transition-all duration-300 ease-in-out group-hover:text-primary">
                {service.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
