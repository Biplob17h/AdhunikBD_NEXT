"use client";

const { useState, useEffect } = require("react");

const useAdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [onGoingOrders, setOnGoingOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderRef, setOrderRef] = useState(1);

  useEffect(() => {
    setOrderLoading(true);

    fetch(`/api/order/all`)
      .then((res) => res.json())
      .then((data) => {
        const allOrders = data?.data || [];

        // Categorize orders based on their status
        setOrders(allOrders);
        setNewOrders(allOrders.filter((order) => order.status === "new"));
        setOnGoingOrders(
          allOrders.filter((order) =>
            ["assigned", "accepted", "served"].includes(order.status)
          )
        );
        setFinishedOrders(allOrders.filter((order) => order.status === "completed"));
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setOrderLoading(false);
      });
  }, [orderRef]);

  return { orders, newOrders, onGoingOrders, finishedOrders, orderLoading, orderRef, setOrderRef };
};

export default useAdminOrder;
