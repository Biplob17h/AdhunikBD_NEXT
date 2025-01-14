import { StarIcon } from "@/components/ui/svgs";
import { ThumbsUp } from "lucide-react";

const ReviewDetailSection = () => {
  return (
    <div className="space-y-8">
      {/* Section Title */}
      <h3 className="text-[26px] font-semibold leading-[48px] text-black/75 underline decoration-primary decoration-wavy underline-offset-8">
        Reviews
      </h3>

      {/* Review Summary */}
      <div className="max-w-[1063px] space-y-6">
        <div className="flex max-w-[843px] flex-wrap items-center gap-5">
          {/* Overall Rating */}
          <div className="inline-flex min-h-[230px] w-full flex-col items-center justify-center bg-[#0B0D0C]/[0.04] text-center lg:w-[286px]">
            <p className="font-inter text-6xl font-bold text-black/75">4.8</p>
            <div className="inline-flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className="w-4 text-[#FFB543]" />
              ))}
            </div>
            <p className="text-base text-black/60">Product Rating</p>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-3 bg-[#0B0D0C]/[0.04] p-6">
            {[
              { stars: 5, percentage: 70 },
              { stars: 4, percentage: 15 },
              { stars: 3, percentage: 10 },
              { stars: 2, percentage: 3 },
              { stars: 1, percentage: 2 },
            ].map((item) => (
              <div key={item.stars} className="flex items-center space-x-4">
                <div className="h-2 w-full rounded-full bg-[#E6EAEE]/70">
                  <div
                    className="h-2 rounded-full bg-[#20590C]"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="inline-flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} className="w-4 text-[#FFB543]" />
                  ))}
                </div>
                <span className="w-10 text-black/60">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h4 className="my-2 text-2xl text-black/90">Comments</h4>
          <div className="divide-y divide-[#0B0D0C]/10">
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="py-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#262740]">
                      <span className="text-base font-medium text-white">
                        S.H
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="inline-flex items-center gap-4">
                        <span>Sunmon Hossain</span>
                        <span className="text-sm text-gray-500">
                          3 Days ago
                        </span>
                      </p>
                      <div className="inline-flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className="w-4 text-[#FFB543]"
                          />
                        ))}
                      </div>
                      <div className="space-y-2">
                        <p className="font-inter text-lg font-medium text-black/60">
                          Great Product
                        </p>
                        <p className="pb-2 leading-[150%] text-black/60">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour There are many
                          variations of passages of Lorem Ipsum available, but
                          the majority have suffered alteration in some form, by
                          injected humour alteration in some form.
                        </p>
                      </div>
                      <div className="mt-3 flex space-x-4 text-sm lg:text-base">
                        <button className="inline-flex items-center gap-1 text-[#667085] hover:underline">
                          {" "}
                          <ThumbsUp className="w-4" /> Like
                        </button>
                        <button className="text-[#EC4C25] hover:underline">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailSection;
