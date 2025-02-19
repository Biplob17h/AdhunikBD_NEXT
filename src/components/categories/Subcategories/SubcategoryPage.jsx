import React from "react";

const SubcategoryPage = ({
  showCategory,
  subCategories,
  subcategoryLoading,
  setShowSubCategory,
  setShow,
  show,
}) => {
  return (
    <div
      className={`mx-auto max-w-4xl p-4 ${show === "subcategory" ? "block" : "hidden"}`}
    >
      {showCategory ? (
        <div>
          <h2 className="mb-4 text-lg font-semibold">Subcategories</h2>

          {subcategoryLoading ? (
            <p className="text-gray-600">Loading subcategories...</p>
          ) : subCategories.length > 0 ? (
            <div className="grid cursor-pointer grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {subCategories.map((sub) => (
                <div
                  key={sub._id}
                  onClick={() => {setShowSubCategory(sub._id), setShow('service')}}
                  className="rounded-md border bg-white p-2 shadow-sm transition-all hover:shadow-md"
                >
                  <img
                    src={sub.photo}
                    alt={sub.subCategory}
                    className="h-24 w-full rounded-md object-cover"
                  />
                  <div className="mt-1">
                    <h3 className="text-sm font-semibold">{sub.subCategory}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No subcategories found.</p>
          )}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-600">
            Please select a category first
          </h1>
        </div>
      )}
    </div>
  );
};

export default SubcategoryPage;
