import { categories } from "@/data/recommended.data";
import { Search } from "lucide-react";

const CategoryFilter = ({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <section className="pb-8 pt-8 xl:pt-16">
      <div className="container_fluid">
        <h2 className="text-center text-3xl font-bold text-black/75 md:text-5xl">
          Unlock the Power of All Services
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-4 xl:justify-between xl:gap-0">
          <div className="relative w-full xl:max-w-[375px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ddd]" />{" "}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-[#ddd] bg-white py-4 pl-12 pr-5 outline-none"
              placeholder="Search..."
            />
          </div>

          <div className="flex flex-1 flex-wrap justify-center gap-0.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-lg px-4 py-2 text-sm ${
                  activeCategory === category.id
                    ? "bg-black text-white"
                    : "bg-transparent text-black/60"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
