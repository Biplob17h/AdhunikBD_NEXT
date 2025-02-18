import { useEffect, useState } from "react";

const useAllCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponRef, setCouponRef] = useState(1);

  useEffect(() => {
    fetch("/api/coupon/all")
      .then((res) => res.json())
      .then((data) => setCoupons(data?.data))
      .finally(() => {
        setCouponLoading(false);
      });
  }, [couponRef]);

  return { coupons, couponLoading, setCouponRef, setCoupons };
};

export default useAllCoupon;
