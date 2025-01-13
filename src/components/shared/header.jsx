import Link from "next/link";
import { ArrowRight } from "../ui/svgs";

const HeaderSection = ({ title, links = ["Home"] }) => {
  return (
    <div className="bg-secondary pb-8 pt-4 xl:pb-16 xl:pt-8">
      <div className="container_fluid">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-black/75 md:text-5xl">
            {title}
          </h1>
          <div className="inline-flex items-center justify-center gap-1 text-base font-semibold text-black/60">
            <Link
              className="transition-all duration-300 ease-in-out hover:text-[#77A1D3]"
              href="/"
            >
              {links[0]}
            </Link>

            <ArrowRight className="inline-block h-5 w-5 p-1" />

            <Link className="text-[#77A1D3]" href="/#">
              {links[1]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
