const CategoryHeroBanner = () => {
  return (
    <section className="pb-8 xl:pb-16">
      <div className="container_fluid">
        <div className="cat_details_hero_banner border-t-[3px] border-primary p-6 xl:p-8">
          <div className="max-w-[1023px]">
            <div className="flex items-center gap-4 lg:gap-8">
              <h2 className="text-2xl font-semibold leading-[32px] text-white lg:text-[32px]">
                Plumbing & Sanitary Services
              </h2>
              <button className="inline-flex max-h-[38px] items-center justify-center rounded-2xl border border-white bg-transparent px-6 py-3 font-heading text-xl font-medium leading-[32px] text-white">
                Home service
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeroBanner;
