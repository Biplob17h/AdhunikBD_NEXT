import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const DetailSection = ({ subCategories, category }) => {
  const router = useRouter()
  return (
    <div>
      <h3 className="mb-4 text-[26px] font-semibold leading-[48px] text-black/75 underline decoration-primary decoration-wavy underline-offset-8">
        Details
      </h3>

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
            residential, commercial, and industrial settings...
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {/* Subcategories Section */}
          <div className="space-y-6 rounded-2xl bg-primary/80 p-6 text-white">
            <h3 className="border-b border-[#b7b7b7] pb-2 text-[26px] font-medium leading-[32px]">
              {category?.category || "Category"}
            </h3>

            {subCategories?.length > 0 ? (
              subCategories.map((subCategory, index) => (
                <div key={index} className="group rounded-lg bg-primary-gradient p-[1px]">
                  <div
                  onClick={()=>{router.push(`/order/${subCategory?._id}`)}}
                    role="button"
                    className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-3 text-[#77A1D3] transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-primary"
                  >
                    <span>{subCategory.subCategory}</span>
                    <IoIosArrowForward />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white/80">No subcategories available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
