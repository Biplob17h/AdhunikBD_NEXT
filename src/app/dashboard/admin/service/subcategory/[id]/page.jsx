"use client";
import AddAService from "@/components/dashboard/adminDashboard/AdminSingleSubcategory/AddAService/AddAService";
import ManageSingleSubcategory from "@/components/dashboard/adminDashboard/AdminSingleSubcategory/ManageSingleSubcategory/ManageSingleSubcategory";
import SubcategorySinglePage from "@/components/dashboard/adminDashboard/AdminSingleSubcategory/SubcategorySinglePage/SubcategorySinglePage";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleSubCategory = () => {
  const { id } = useParams();
  const [subCategoryShow, setSubCategoryShow] = useState("manage");
  const [subCategory, setSubCategory] = useState({});
  const [category, setCategory] = useState({});
  const [services, setServices] = useState([]);
  const [subCategoryRef, setSubCategoryRef] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/subcategory?subCategoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategory(data?.data);
        setCategory(data?.category);
      })
      .finally(() => setLoading(false));
  }, [id, subCategoryRef]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/subcategory/service?subCategoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data?.data);
      })
      .finally(() => setLoading(false));
  }, [subCategoryRef]);

  return (
    <div className="p-6">
      {/* Back Button & Title */}
      <div className="mb-6 flex w-full items-center justify-between gap-4 px-10">
        <button
          onClick={() =>
            router.push(`/dashboard/admin/service/category/${category?._id}`)
          }
          disabled={loading}
          className={`rounded-lg px-4 py-2 transition ${
            loading
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          ← Go Back
        </button>
        {loading ? (
          <h1 className="text-2xl font-semibold text-gray-800">Loading...</h1>
        ) : (
          <h1 className="text-2xl font-semibold text-gray-800">
            Subcategory: {subCategory?.subCategory || "Not Found"}
          </h1>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex border-b-2 border-gray-300">
        {["manage", "add"].map((tab) => (
          <button
            key={tab}
            disabled={loading}
            className={`flex-1 border-b-2 py-2 text-center transition ${
              subCategoryShow === tab
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            } hover:border-blue-500 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => !loading && setSubCategoryShow(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading data...</p>
      ) : (
        <>
          {subCategoryShow === "manage" && (
            <ManageSingleSubcategory
              subCategory={subCategory}
              category={category}
              setSubCategoryRef={setSubCategoryRef}
              setSubCategoryShow={setSubCategoryShow}
              services={services}
            />
          )}
          {subCategoryShow === "add" && (
            <AddAService
              subCategory={subCategory}
              category={category}
              setSubCategoryRef={setSubCategoryRef}
              setSubCategoryShow={setSubCategoryShow}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SingleSubCategory;
