"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapIcon } from "@/components/ui/svgs";
import { Search } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [location, setLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const popularSearches = ["Shifting", "Beauty", "Home service"];

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      if (data && data.address) {
        console.log(data.address);
        const { town } = data.address;
        setLocation(`${town || ""}`.trim());
      } else {
        setLocation("Unable to fetch location details");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setLocation("Error fetching location details");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("Unable to retrieve location");
        },
      );
    } else {
      setLocation("Geolocation is not supported by this browser");
    }
  };

  const handlePopularSearchClick = (item) => {
    setSearchValue(item);
  };

  return (
    <section className="container_fluid bg-hero-home">
      <div className="items-center justify-between gap-12 space-y-12 py-8 lg:flex lg:space-y-0 xl:px-12 xl:gap-16">
        <div className="lg:max-w-xl xl:max-w-[668px]">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white md:text-6xl lg:text-5xl xl:text-[58px] xl:leading-none">
              Simplify Your World Achieve More
            </h2>
            <p className="text-base font-light text-white xl:text-xl xl:leading-[32px]">
              Streamline tasks, manage schedules, and access smart solutions
              designed to simplify your life. Boost productivity effortlessly
              with a personal assistant that keeps you organized, focused, and
              always one step ahead
            </p>
          </div>
          {/* location search */}
          <div className="mt-6 max-w-[547px]">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLocationClick}
                variant="outline"
                className="h-12 border-none bg-white px-8 py-3 font-medium text-black"
                role="button"
                aria-label="location"
              >
                <MapIcon />
                <span>{location ? location : "Location"}</span>
              </Button>
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Service Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-12 rounded-lg border-none bg-white py-3 pl-4 pr-3 text-black placeholder:text-[#8C8C8C]"
                />
                <button
                  className="absolute right-2.5 top-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black p-1.5 text-white"
                  onClick={() => alert(`Searching for: ${searchValue}`)}
                >
                  <Search />
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center">
              <p className="text-white">Popular Searches:</p>
              <div className="flex space-x-2">
                {popularSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(item)}
                    className="max-h-8 rounded-full bg-black px-4 py-1 text-sm text-white xl:text-base"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center lg:justify-end">
          <img
            src="/images/hero-workers-frame.png"
            className="w-full select-none"
            alt="workers"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
