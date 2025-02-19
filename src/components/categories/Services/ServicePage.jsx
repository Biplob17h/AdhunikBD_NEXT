import React, { useEffect, useState } from "react";

const ServicePage = ({
  show,
  services,
  servicesLoading,
  onBack,
  subCategory,
  setShow,
  setServices,
}) => {
  const [selectedServices, setSelectedServices] = useState({});

  // Load selected services from local storage on mount
  useEffect(() => {
    const storedServices =
      JSON.parse(localStorage.getItem("selectedServices")) || {};
    setSelectedServices(storedServices);
  }, []);

  // Handle Add Service
  const handleAddService = (service) => {
    const updatedServices = { ...selectedServices, [service._id]: 1 };
    setSelectedServices(updatedServices);
    localStorage.setItem("selectedServices", JSON.stringify(updatedServices));
  };

  // Handle Quantity Change
  const handleQuantityChange = (serviceId, change) => {
    const updatedServices = { ...selectedServices };
    if (updatedServices[serviceId] + change <= 0) {
      delete updatedServices[serviceId];
    } else {
      updatedServices[serviceId] += change;
    }
    setSelectedServices(updatedServices);
    localStorage.setItem("selectedServices", JSON.stringify(updatedServices));
  };

  if (show !== "service") return null;

  return (
    <div className="p-4">
      {/* Back Button + Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => {
            setShow("subcategory");
          }}
          className="flex items-center gap-2 text-sm font-medium text-pink-500 hover:underline"
        >
          ← {`${services[0]?.subCategoryId?.subCategory}`.toUpperCase()}
        </button>
        <span className="text-sm text-gray-600">
          {services.length} options available
        </span>
      </div>

      {/* Subcategory Info */}
      {subCategory && (
        <div className="mb-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
          <p className="font-medium">{subCategory.name}</p>
          <p className="text-gray-500">{subCategory.description}</p>
        </div>
      )}

      {/* Services List */}
      <h2 className="mb-4 text-lg font-semibold">Select Your Service</h2>

      {servicesLoading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : services.length > 0 ? (
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
            >
              {/* Left: Service Details */}
              <div>
                <h3 className="text-md font-semibold">{service.name}</h3>
                <p className="text-xs text-gray-500">
                  • Extra Charges will be applicable for Additional Work
                </p>
                <p className="mt-1 text-sm">
                  <span className="mr-2 text-gray-400 line-through">
                    ৳{service.originalPrice}
                  </span>
                  <span className="font-medium text-green-600">
                    ৳{service.price}
                  </span>
                </p>
              </div>

              {/* Right: Quantity Selector / Add Button */}
              {selectedServices[service._id] ? (
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button
                    onClick={() => handleQuantityChange(service._id, -1)}
                    className="px-3 py-1 text-lg text-pink-500"
                  >
                    −
                  </button>
                  <span className="px-4 text-sm">
                    {selectedServices[service._id]} piece
                  </span>
                  <button
                    onClick={() => handleQuantityChange(service._id, 1)}
                    className="px-3 py-1 text-lg text-pink-500"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddService(service)}
                  className="rounded-lg border border-pink-500 px-3 py-2 text-sm font-medium text-pink-500 transition-all hover:bg-pink-500 hover:text-white"
                >
                  Add +
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </div>
  );
};

export default ServicePage;
