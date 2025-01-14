const ServicesOfCategorySection = () => {
  return (
    <div>
      <h2>Shifting</h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendedServices.map((service) => (
          <Link
            key={service.id}
            href={`/categories/${service.id}`}
            className="group cursor-pointer space-y-2 rounded-2xl border border-black/[0.06] bg-[#fbfbfb] p-6 text-center"
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
  );
};

export default ServicesOfCategorySection;
