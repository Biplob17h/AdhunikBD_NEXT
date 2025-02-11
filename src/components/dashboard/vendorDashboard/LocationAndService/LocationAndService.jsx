import React from "react";

const LocationAndService = ({ vendorShow, setVendorShow }) => {
  return (
    <div className={`${vendorShow === "location" ? "block" : "hidden"}`}>
      <h1>Add location and service</h1>
    </div>
  );
};

export default LocationAndService;
