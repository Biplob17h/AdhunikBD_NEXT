import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCategories from "@/hooks/CategoriesHook";
import { useRouter } from "next/navigation";
import React from "react";

const AdminServiceManage = () => {
  const { categories, categoriesLoading } = useCategories();
  const router = useRouter();

  if (categoriesLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.length > 0 ? (
        categories.map((category) => (
          <Card
            key={category._id}
            onClick={() =>
              router.push(`/dashboard/admin/service/category/${category._id}`)
            }
            className=""
          >
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={category.photo}
                alt={category.categoryName}
                className="h-48 w-full object-cover"
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default AdminServiceManage;
