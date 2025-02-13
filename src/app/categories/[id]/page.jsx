"use client";
import DetailTabSection from "@/components/screens/category-details/detail-tabs";
import CategoryHeroBanner from "@/components/screens/category-details/hero";
import AdsBannerSection from "@/components/screens/home/app-ads";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoriesDetailsPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    fetch(`/api/category?categoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data);
        setLoading(false);
      });
  },[])

  useEffect(() => {
    setLoading(true);
    fetch(`/api/category/subcategory?categoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(data.data);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <CategoryHeroBanner category={category}/>
      <DetailTabSection />
      <AdsBannerSection />
    </>
  );
};

export default CategoriesDetailsPage;
