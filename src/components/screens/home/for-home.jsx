import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ForHomeSectionSlider = () => {
  return (
    <section className="pb-16 xl:pb-32">
      <div className="container_fluid">
        <div className="heading mx-auto max-w-[855px] text-center">
          <h2 className="text-3xl font-bold text-black/75 md:text-[42px] md:leading-none">
            For Your Home
          </h2>
        </div>

        {/* for your home slider */}
        <div className="mt-8">
          <Carousel>
            <CarouselContent>
              {Array.from({ length: 12 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div>
                    <div className="relative">
                      <img
                        src="/images/for-home.png"
                        className="h-full w-full rounded-xl object-cover"
                        alt="work-image"
                      />
                      <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2">
                        <p className="mx-auto max-w-[199.31px] rounded-xl bg-white/30 p-[7.46px] text-center font-heading text-[13.44px] font-bold text-white/75 backdrop-blur-sm">
                          Plumbing & Sanitary Services
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ForHomeSectionSlider;
