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

        {/* for your home slider */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/categories/id"
            className="cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
          >
            <div>
              <img
                src="/images/recommended/service1.png"
                className="h-full w-full rounded-xl object-cover"
                alt="service"
              />
            </div>
            <p className="text-xs font-bold text-black">
              Plumbing & Sanitary Services
            </p>
          </Link>
          <Link
            href="/categories/id"
            className="cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
          >
            <div>
              <img
                src="/images/recommended/service2.png"
                className="h-full w-full rounded-xl object-cover"
                alt="service"
              />
            </div>
            <p className="text-xs font-bold text-black">
              Plumbing & Sanitary Services
            </p>
          </Link>{" "}
          <Link
            href="/categories/id"
            className="cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
          >
            <div>
              <img
                src="/images/recommended/service3.png"
                className="h-full w-full rounded-xl object-cover"
                alt="service"
              />
            </div>
            <p className="text-xs font-bold text-black">
              Plumbing & Sanitary Services
            </p>
          </Link>{" "}
          <Link
            href="/categories/id"
            className="cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
          >
            <div>
              <img
                src="/images/recommended/service4.png"
                className="h-full w-full rounded-xl object-cover"
                alt="service"
              />
            </div>
            <p className="text-xs font-bold text-black">
              Plumbing & Sanitary Services
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
