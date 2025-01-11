import Link from "next/link";

const AdsBannerSection = () => {
  const appStores = [
    { src: "/app.svg", alt: "App Store", href: "/#" },
    { src: "/google-play.svg", alt: "Google Play", href: "/#" },
  ];
  return (
    <section className="pb-16">
      <div className="container_fluid ads-banner overflow-hidden">
        <div className="items-center justify-between gap-6 pl-6 pt-12 lg:flex lg:pl-12 lg:pt-0">
          <div className="max-w-[460px] space-y-6 xl:max-w-[666px]">
            <h2 className="text-2xl font-bold text-black/75 md:text-3xl xl:text-5xl">
              Get your service from our app
            </h2>
            <p className="text-base leading-[27px] text-black/60">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some.
            </p>
            <div className="flex items-center gap-2">
              {appStores.map((store, index) => (
                <Link href={store.href} className="inline-block" key={index}>
                  <img className="w-full" src={store.src} alt={store.alt} />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="relative top-6">
              <img
                src="/phone-mockup.png"
                className="rounded-2xl"
                alt="app-mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsBannerSection;
