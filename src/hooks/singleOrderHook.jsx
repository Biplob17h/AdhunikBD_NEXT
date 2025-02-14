"use client";

const { useState, useEffect } = require("react");

const useSingleOrder = (id) => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [orderRef, setOrderRef] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/order?orderId=${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data?.data))
      .finally(() => setIsLoading(false));
  }, [id, orderRef]);

  return { order, isLoading, orderRef, setOrderRef };
};

export default useSingleOrder;
