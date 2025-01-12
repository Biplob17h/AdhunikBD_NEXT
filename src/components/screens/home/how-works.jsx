const HowWorkSection = () => {
  return (
    <section className="pb-16 xl:pb-32">
      <div className="how-works-bg py-10 xl:py-20">
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

          {/* Dynamic categories */}
          <div className="mt-10">cards</div>
        </div>
      </div>
    </section>
  );
};

export default HowWorkSection;
