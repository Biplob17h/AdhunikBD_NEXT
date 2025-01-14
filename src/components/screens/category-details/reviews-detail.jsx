import { StarIcon } from "@/components/ui/svgs";

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
        <div className="space-y-4">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-gray-50 p-4 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <span className="text-sm font-bold text-gray-600">S.H</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Sunmon Hossain
                    </p>
                    <p className="text-sm text-gray-500">3 Days ago</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-medium">Great Product</p>
                  <p className="mt-2 text-gray-600">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour.
                  </p>
                </div>
                <div className="mt-3 flex space-x-4 text-sm text-gray-600">
                  <button className="hover:underline">Like</button>
                  <button className="hover:underline">Reply</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailSection;
