import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const DetailSection = () => {
  return (
    <div>
      <h3 className="mb-4 text-[26px] font-semibold leading-[48px] text-black/75">
        Details
      </h3>
      {/*  */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <img
              src="/images/categories/details/details-tab-img.png"
              alt="details-service"
              className="max-h-[372px] w-full rounded-2xl object-cover"
            />
          </div>
          <p className="text-base text-black/60 lg:leading-[32px]">
            Plumbing and sanitary services are essential for ensuring the proper
            functioning of water supply, drainage, and sanitation systems in
            residential, commercial, and industrial settings. These services
            cover a wide range of tasks, including the installation,
            maintenance, and repair of pipes, fixtures, faucets, water heaters,
            drainage systems, and sewage systems.
          </p>{" "}
          <p className="text-base text-black/60 lg:leading-[32px]">
            Professionals in this field address common issues such as leaky
            pipes, clogged drains, low water pressure, malfunctioning water
            heaters, and broken fixtures. Additionally, they ensure that waste
            disposal systems are functioning effectively and in compliance with
            health and safety regulations. Modern plumbing services often
            incorporate advanced technologies, such as smart water systems,
            eco-friendly solutions, and sustainable practices to conserve water
            and energy. With the expertise of licensed and certified plumbers,
            clients can expect efficient, reliable, and cost-effective solutions
            tailored to their specific needs.
          </p>{" "}
          <p className="text-base text-black/60 lg:leading-[32px]">
            Sanitary services play a crucial role in maintaining hygiene by
            ensuring the safe disposal of wastewater and sewage. These services
            help prevent health hazards, protect the environment, and promote a
            clean and comfortable living or working space. Whether it’s a minor
            repair, a full-scale installation, or routine maintenance, plumbing
            and sanitary services are vital for the well-being and functionality
            of any property
          </p>
        </div>
        <div className="space-y-8 lg:space-y-12">
          <div className="space-y-6 rounded-2xl bg-primary/80 p-6 text-white">
            <h3 className="border-b border-[#b7b7b7] pb-2 text-[26px] font-medium leading-[32px]">
              Request A Quote
            </h3>
            <form action="#" className="space-y-6">
              <div className="rounded-lg bg-primary-gradient p-[1px]">
                <Input
                  type="text"
                  className="w-full rounded-lg bg-white px-4 py-3 text-black/75 outline-none placeholder:text-[#77A1D3]"
                  placeholder="Name"
                  required
                />
              </div>{" "}
              <div className="rounded-lg bg-primary-gradient p-[1px]">
                <Input
                  type="email"
                  className="w-full rounded-lg bg-white px-4 py-3 text-black/75 outline-none placeholder:text-[#77A1D3]"
                  placeholder="Email"
                  required
                />
              </div>{" "}
              <div className="rounded-lg bg-primary-gradient p-[1px]">
                <Input
                  type="tel"
                  className="w-full rounded-lg bg-white px-4 py-3 text-black/75 outline-none placeholder:text-[#77A1D3]"
                  placeholder="Phone"
                  pattern="[0-9]{10}"
                  required
                />
              </div>{" "}
              <div className="rounded-lg px-[1px]">
                <textarea
                  className="min-h-[87px] w-full resize-none rounded-lg bg-white px-4 py-3 text-black/75 outline-none placeholder:text-[#77A1D3]"
                  placeholder="Message"
                />
              </div>
              <Button className="min-h-[47px] w-full rounded-lg bg-black/75 text-white">
                Send Me
              </Button>
            </form>
          </div>{" "}
          <div className="space-y-6 rounded-2xl bg-primary/80 p-6 text-white">
            <h3 className="border-b border-[#b7b7b7] pb-2 text-[26px] font-medium leading-[32px]">
              Plumbing & Sanitary
            </h3>
            <div className="group rounded-lg bg-primary-gradient p-[1px]">
              <Link
                href="/categories"
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-[#77A1D3] transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary"
              >
                <p>Plumbing Check up</p>
                <IoIosArrowForward />
              </Link>
            </div>{" "}
            <div className="group rounded-lg bg-primary-gradient p-[1px]">
              <Link
                href="/categories"
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-[#77A1D3] transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary"
              >
                <p>Water Tap servicing</p>
                <IoIosArrowForward />
              </Link>
            </div>{" "}
            <div className="group rounded-lg bg-primary-gradient p-[1px]">
              <Link
                href="/categories"
                className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-[#77A1D3] transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary"
              >
                <p>Sink Issues</p>
                <IoIosArrowForward />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
