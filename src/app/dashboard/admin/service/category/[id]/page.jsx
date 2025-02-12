"use client";
import AddASubcategory from "@/components/dashboard/adminDashboard/AdminSingleCategory/AddASubcategory/AddASubcategory";
import AllSubcategories from "@/components/dashboard/adminDashboard/AdminSingleCategory/AllSubcategories/AllSubcategories";
import ManageSingleCategory from "@/components/dashboard/adminDashboard/AdminSingleCategory/ManageSingleCategory/ManageSingleCategory";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleCategory = () => {
  const { id } = useParams();
  const [categoryShow, setCategoryShow] = useState("subcategory");
  const [category, setCategory] = useState([]);
  const [categoryRef, setCategoryRef] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/category?categoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data);
      })
      .finally(() => setLoading(false));
  }, [id, categoryRef]);

  

  return (
    <div className="p-6">
      <div className="mb-6 flex w-full items-center justify-between gap-4 px-10">
        <button
          onClick={() => {
            router.push("/dashboard/admin/service");
          }}
          className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
        >
          ← Go Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          Category: {category?.category}
        </h1>
      </div>

      {/* Tab Buttons */}
      <div className="mb-6 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            categoryShow === "subcategory"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setCategoryShow("subcategory")}
        >
          Subcategory
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            categoryShow === "manage"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setCategoryShow("manage")}
        >
          Manage
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            categoryShow === "add"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setCategoryShow("add")}
        >
          Add Subcategory
        </button>
      </div>

      {/* Tab Content */}
      <div className={`${categoryShow === "subcategory" ? "block" : "hidden"}`}>
        <AllSubcategories id={id} categoryRef={categoryRef}/>
      </div>
      <div className={`${categoryShow === "manage" ? "block" : "hidden"}`}>
        <ManageSingleCategory
          id={id}
          category={category}
          categoryRef={categoryRef}
          setCategoryRef={setCategoryRef}
        />
      </div>
      <div className={`${categoryShow === "add" ? "block" : "hidden"}`}>
        <AddASubcategory
          id={id}
          setCategoryRef={setCategoryRef}
          setCategoryShow={setCategoryShow}
        />
      </div>
    </div>
  );
};

export default SingleCategory;
