"use client"
import React, { useState } from "react";

const LocationAndService = () => {
  const [sectionShow, setSectionShow] = useState("location");

  return (
    <div className={``}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${sectionShow === "location" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setSectionShow("location")}
        >
          Location
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${sectionShow === "service" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setSectionShow("service")}
        >
          Service
        </button>
      </div>

      <div className={`${sectionShow === "location" ? "block" : "hidden"}`}>
        <h2>Location</h2>
        {/* Location content */}
      </div>
      <div className={`${sectionShow === "service" ? "block" : "hidden"}`}>
        <h2>Service</h2>
        {/* Service content */}
      </div>
    </div>
  );
};

export default LocationAndService;
