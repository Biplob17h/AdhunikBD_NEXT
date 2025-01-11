const GallerySlider = () => {
  return (
    <section className="bg-secondary py-12 xl:py-[60px]">
      <div className="heading mx-auto max-w-[855px] space-y-4 text-center">
        <h2 className="text-3xl font-bold text-black/75 md:text-5xl">
          Gallery
        </h2>
        <p className="text-base text-black/60">
          Discover tailored categories designed to simplify your search, explore
          diverse options, and <br className="hidden md:block" /> find exactly
          what you need effortlessly
        </p>
      </div>

      {/* Dynamically render services */}
      <div className="mt-10 text-center text-5xl text-black/50">
        Coming soon...
      </div>
    </section>
  );
};

export default GallerySlider;
