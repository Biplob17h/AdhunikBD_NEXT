"use client";

import useSingleOrder from "@/hooks/singleOrderHook";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import useAdminOrder from "@/hooks/adminOrderHooks";

const NewOrderSinglePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { order, isLoading } = useSingleOrder(id);
  const { setOrderRef } = useAdminOrder();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center text-lg text-red-500">
        Order not found!
      </div>
    );
  }

  const handleAcceptOrder = () => {
    fetch("/api/order", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order?._id, action: "accept" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("Order Accepted successfully!");
          setOrderRef((prev) => prev + 1);
          router.back();
        } else {
          console.error("Failed to update order:", data.message);
        }
      });
  };
  const handleRejectOrder = () => {
    fetch("/api/order", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order?._id, action: "reject" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("Order rejected successfully!");
          setOrderRef((prev) => prev + 1);
          router.back();
        } else {
          console.error("Failed to update order:", data.message);
        }
      });
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-md">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Order Header */}
      <div className="mb-8 flex items-center gap-6">
        <Image
          src={order?.user?.photo || "/placeholder.jpg"}
          alt="Order Image"
          width={100}
          height={100}
          className="rounded-lg border"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {order.customerName}
          </h2>
          <p className="text-gray-700">📧 {order.customerEmail}</p>
          <p className="text-gray-700">📞 {order.customerPhone}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-4 text-lg">
        <h4 className="text-xl font-semibold text-gray-800">Order Details</h4>
        <p>
          🏠 <span className="font-medium">Address:</span> {order.house},{" "}
          {order.road}, {order.area}
        </p>
        <p>
          📍 <span className="font-medium">Location:</span> {order.location}
        </p>
        <p>
          📅 <span className="font-medium">Order Date:</span>{" "}
          {new Date(order.orderAt).toLocaleString()}
        </p>
        <p>
          📆 <span className="font-medium">Service Date:</span>{" "}
          {new Date(order.date).toLocaleDateString()}
        </p>
        <p>
          ⏰ <span className="font-medium">Time Slot:</span> {order.time}
        </p>
        <p>
          ⚠️ <span className="font-medium">Problem Description:</span>{" "}
          {order.problem}
        </p>
        <p>
          🛠 <span className="font-medium">Service:</span>{" "}
          {order.service?.name || "Unknown Service"}
        </p>
        <p>
          🎟 <span className="font-medium">Discount Applied:</span>{" "}
          {order.discount} Tk
        </p>
        <p className="font-semibold">
          💵 <span className="font-medium">Total Price:</span>{" "}
          {order.totalPrice || 0} Tk
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-6">
        <button
          onClick={() => {
            handleAcceptOrder();
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-lg text-white transition hover:bg-green-700"
        >
          <CheckCircle size={20} /> Accept Order
        </button>
        <button
          onClick={() => {
            handleRejectOrder();
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-lg text-white transition hover:bg-red-700"
        >
          <XCircle size={20} /> Reject Order
        </button>
      </div>
    </div>
  );
};

export default NewOrderSinglePage;
