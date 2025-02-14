"use client";
import { useEffect, useState } from "react";

const useUserOrders = (userId) => {
  // Accept userId as a parameter
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderRef, setOrderRef] = useState(1);

  useEffect(() => {
    if (!userId) return; // Ensure userId is provided

    setOrderLoading(true);
    fetch(`/api/order/user/all?userId=${userId}`) // Pass userId as query parameter
      .then((res) => res.json())
      .then((data) => {
        setOrders(data?.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrderLoading(false);
      })
      .finally(() => {
        setOrderLoading(false);
      });
  }, [orderRef, userId]);

  return { orders, orderLoading, orderRef, setOrderRef };
};

export default useUserOrders;
