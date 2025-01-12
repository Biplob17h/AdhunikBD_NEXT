const HowWorkSection = () => {
  return (
    <section className="pb-16 xl:pb-32">
      <div className="how-works-bg relative -z-20 py-10 xl:py-20">
        <div className="container_fluid">
          <div className="heading mx-auto max-w-[855px] space-y-4 text-center">
            <h2 className="text-3xl font-bold uppercase text-black/75 md:text-5xl">
              How It Works
            </h2>
            <p className="text-base text-black/60">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have <br className="hidden md:block" /> suffered
              alteration in some.
            </p>
          </div>

          {/* Step Cards */}
          <div className="mx-auto mt-10 grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 md:px-8 lg:gap-x-20 lg:gap-y-0 xl:max-w-[1021px] xl:px-0">
            {/* Step 1 */}
            <div className="relative max-w-[426px] rounded-3xl border border-[#E6F1FE] bg-white">
              <div className="relative z-20 h-full w-full space-y-4 rounded-3xl bg-white p-4 text-center lg:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[6px] bg-black font-inter text-[32px] leading-none text-white">
                  1
                </div>
                <h3 className="text-2xl font-semibold uppercase text-black/75">
                  Lorem Ipsum
                </h3>
                <p className="max-w-[340px] text-base font-light leading-[27px] text-black/60">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration
                </p>
              </div>
              <div className="absolute z-10 hidden -translate-y-1/2 lg:-right-[30%] lg:top-[95%] lg:block xl:-right-[50%] xl:top-[65%]">
                <img src="/first-step.svg" alt="first step" />
              </div>
            </div>
            <div className="hidden lg:block" />
            <div className="hidden lg:block" />

            {/* Step 2 */}
            <div className="relative max-w-[426px] space-y-4 rounded-3xl border border-[#E6F1FE] bg-white p-4 text-center lg:relative lg:p-8 xl:-top-24 xl:left-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[6px] bg-black font-inter text-[32px] leading-none text-white">
                2
              </div>
              <h3 className="text-2xl font-semibold uppercase text-black/75">
                Lorem Ipsum
              </h3>
              <p className="max-w-[340px] text-base font-light leading-[27px] text-black/60">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration
              </p>
              <div className="absolute -left-1/2 top-full -z-10 hidden -translate-y-1/2 lg:block">
                <img src="/second-step.svg" alt="second step" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative max-w-[426px] rounded-3xl border border-[#E6F1FE] bg-white xl:-top-20 xl:left-16">
              <div className="relative z-20 h-full w-full space-y-4 rounded-3xl bg-white p-4 text-center lg:p-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[6px] bg-black font-inter text-[32px] leading-none text-white">
                  3
                </div>
                <h3 className="text-2xl font-semibold uppercase text-black/75">
                  Lorem Ipsum
                </h3>
                <p className="max-w-[340px] text-base font-light leading-[27px] text-black/60">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration
                </p>
              </div>
              <div className="absolute z-10 hidden -translate-y-1/2 lg:-right-[40%] lg:top-[100%] lg:block">
                <img src="/third-step.svg" alt="third step" />
              </div>
            </div>
            <div className="hidden lg:block" />
            <div className="hidden lg:block" />

            {/* Step 4 */}
            <div className="relative max-w-[426px] space-y-4 rounded-3xl border border-[#E6F1FE] bg-white p-4 text-center lg:-top-12 lg:p-8 xl:-top-[128px] xl:left-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[6px] bg-black font-inter text-[32px] leading-none text-white">
                4
              </div>
              <h3 className="text-2xl font-semibold uppercase text-black/75">
                Lorem Ipsum
              </h3>
              <p className="max-w-[340px] text-base font-light leading-[27px] text-black/60">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorkSection;
