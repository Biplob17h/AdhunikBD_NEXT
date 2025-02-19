import { handleAddToLocalStorage } from "@/utils/addToLocalStroge/addToLocalStorage";
import React, { useEffect, useState } from "react";

const ServicePage = ({
  show,
  services,
  servicesLoading,
  setShow,
  subCategory,
  localRef,
  setLocalRef,
}) => {
  const [selectedServices, setSelectedServices] = useState([]);

  // Load selected services from local storage on mount
  useEffect(() => {
    const storedServices =
      JSON.parse(localStorage.getItem("AdhunikServices")) || [];
    setSelectedServices(storedServices);
  }, [localRef]);

  // Handle Add Service
  const handleAddService = (service) => {
    const serviceData = {
      serviceId: service._id,
      name: service.name,
      subCategoryName: service?.subCategoryId?.subCategory,
      subCategoryId: service?.subCategoryId?._id,
      categoryName: service?.categoryId?.category,
      categoryId: service?.categoryId?._id,
      price: service?.price,
      quantity: 1,
      discountType: service?.subCategoryId?.discount[0]?.type || null,
      discountValue: service?.subCategoryId?.discount[0]?.discount || 0,
    };

    handleAddToLocalStorage(serviceData);
    setLocalRef((prev) => prev + 1);
  };

  // Check if service is already selected
  const isServiceSelected = (serviceId) => {
    return selectedServices.some((service) => service.serviceId === serviceId);
  };

  if (show !== "service") return null;

  return (
    <div className="p-4">
      {/* Back Button + Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setShow("subcategory")}
          className="flex items-center gap-2 text-sm font-medium text-pink-500 hover:underline"
        >
          ← {subCategory?.name?.toUpperCase() || "BACK"}
        </button>
        <span className="text-sm text-gray-600">
          {services.length} options available
        </span>
      </div>

      {/* Services List */}
      {servicesLoading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : services.length > 0 ? (
        <div className="space-y-4">
          {services.map((service) => {
            const discount = service?.subCategoryId?.discount?.[0];
            let discountedPrice = service.price;

            if (discount) {
              if (discount.type === "flat") {
                discountedPrice = Math.max(service.price - discount.discount, 0);
              } else if (discount.type === "percentage") {
                discountedPrice = Math.max(
                  service.price - (service.price * discount.discount) / 100,
                  0
                );
              }
            }

            return (
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
                    {discount && (
                      <span className="mr-2 text-gray-400 line-through">
                        ৳{service.price}
                      </span>
                    )}
                    <span className="font-medium text-green-600">
                      ৳{discountedPrice}
                    </span>
                    {discount && (
                      <span className="ml-2 text-xs font-medium text-red-500">
                        {discount.type === "flat"
                          ? `৳${discount.discount} Off`
                          : `${discount.discount}% Off`}
                      </span>
                    )}
                  </p>
                </div>

                {/* Right: Quantity Selector / Add Button */}
                {isServiceSelected(service?._id) ? (
                  <div className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                    <h1>Already In Cart</h1>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddService(service)}
                    className="rounded-lg border border-pink-500 bg-white px-3 py-2 text-sm font-medium text-pink-500 transition-all duration-200 hover:bg-pink-500 hover:text-white"
                  >
                    Add +
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </div>
  );
};

export default ServicePage;
