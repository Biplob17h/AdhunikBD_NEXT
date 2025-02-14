'use client'
import { useState, useEffect } from "react";

const useVendors = (status) => {
  const [vendors, setVendors] = useState([]);
  const [vendorRequests, setVendorRequests] = useState([]);
  const [vendorStatusLoading, setVendorStatusLoading] = useState(false);
  const [vendorStatusRef, setVendorStatusRef] = useState(1);

  useEffect(() => {
    setVendorStatusLoading(true);
    
    fetch(`/api/vendor/all`)
      .then((response) => response.json())
      .then((data) => {
        const allVendors = data?.data || [];

        // Filter pending vendors
        const pendingVendors = allVendors.filter(vendor => vendor.status === "pending");

        // Filter only active and blocked vendors
        const filteredVendors = allVendors.filter(
          vendor => vendor.status === "active" || vendor.status === "blocked"
        );

        setVendors(filteredVendors);
        setVendorRequests(pendingVendors);
      })
      .catch((error) => console.error("Error fetching vendors:", error))
      .finally(() => setVendorStatusLoading(false));
  }, [status, vendorStatusRef]);

  return { vendors, vendorRequests, setVendorStatusRef, vendorStatusLoading };
};

export default useVendors;
