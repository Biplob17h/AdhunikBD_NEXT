"use client";

import { useEffect, useState } from "react";

const useSubCategoryServices = (subcategoryId) => {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesRef, setServicesRef] = useState(1);

  useEffect(() => {
    if (!subcategoryId) {
      setServices([]);
      return;
    }

    setServicesLoading(true);
    const abortController = new AbortController();

    fetch(`/api/subcategory/service?subCategoryId=${subcategoryId}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data?.data || []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Fetch Error:", err);
      })
      .finally(() => {
        setServicesLoading(false);
      });

    return () => abortController.abort();
  }, [subcategoryId, servicesRef]);

  return {
    services,
    servicesLoading,
    setServicesRef,
    setServices
  };
};

export default useSubCategoryServices;
