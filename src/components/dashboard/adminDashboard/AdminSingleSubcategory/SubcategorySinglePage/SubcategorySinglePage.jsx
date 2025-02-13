import React from "react";

const SubcategorySinglePage = ({ subCategory, category, services }) => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Subcategory Info */}
      <div className="mb-8 flex flex-col items-center">
        <img
          src={subCategory.photo}
          alt={subCategory.subCategory}
          className="mb-4 h-48 w-48 rounded-lg object-cover shadow-md"
        />
        <h1 className="text-3xl font-semibold text-gray-800">
          {subCategory.subCategory}
        </h1>
        <p className="text-lg text-gray-600">Category: {category?.category}</p>
      </div>

      {/* Services List */}
      {services?.length > 0 ? (
        <div>
          <h2 className="mb-4 text-xl font-semibold">Available Services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service._id}
                className="rounded-lg border p-4 shadow-md bg-white"
              >
                <h3 className="text-lg font-medium">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-blue-500 font-semibold mt-2">
                  Price: {service.price} tk
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No services available for this subcategory.
        </p>
      )}
    </div>
  );
};

export default SubcategorySinglePage;
