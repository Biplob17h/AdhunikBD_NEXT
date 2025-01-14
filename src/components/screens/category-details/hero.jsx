const CategoryHeroBanner = () => {
  return (
    <section className="pb-8 xl:pb-16">
      <div className="container_fluid">
        <div className="cat_details_hero_banner border-t-[3px] border-primary p-6 xl:p-8">
          <div className="max-w-[1023px] space-y-4">
            <div className="flex items-center gap-4 lg:gap-8">
              <h2 className="text-2xl font-semibold leading-[32px] text-white lg:text-[32px]">
                Plumbing & Sanitary Services
              </h2>
              <button className="inline-flex max-h-[38px] cursor-text items-center justify-center rounded-2xl border border-white bg-transparent px-6 py-1 font-heading text-lg font-medium text-white">
                Home service
              </button>
            </div>
            <p className="max-w-[587px] text-base font-light leading-[32px] text-white">
              Reliable, professional, affordable, efficient, trusted, skilled,
              quality, responsive, certified, guaranteed, experienced,
              sustainable, modern
            </p>
            <div>
              <button className="inline-flex max-h-[45px] items-center justify-center rounded-lg bg-white px-6 py-2 text-lg font-semibold uppercase leading-[32px] text-black/75">
                Add to favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHeroBanner;
