"use client";
import useSingleOrder from "@/hooks/singleOrderHook";
import { useParams, useNavigate, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const OnGoingOrderSinglePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { order, isLoading } = useSingleOrder(id);
  

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    house: "",
    road: "",
    area: "",
    location: "",
    date: "",
    problem: "",
    time: "",
    totalPrice: 0,
    status: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || "",
        customerEmail: order.customerEmail || "",
        customerPhone: order.customerPhone || "",
        house: order.house || "",
        road: order.road || "",
        area: order.area || "",
        location: order.location || "",
        date: order.date || "",
        problem: order.problem || "",
        time: order.time || "",
        totalPrice: order.totalPrice || 0,
        status: order.status || "",
      });
    }
  }, [order]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-lg text-red-500">
        Order not found!
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated Order Data:", formData);
    // Call your update API function here
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Go back to the previous page
        className="mb-4 font-medium text-blue-600 hover:text-blue-800"
      >
        &larr; Back
      </button>

      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Update Ongoing Order
      </h2>
      <form className="grid gap-6">
        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="house"
              value={formData.house}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              placeholder="House No."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="road"
              value={formData.road}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              placeholder="Road"
            />
          </div>
          <div>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              placeholder="Area"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Time Slot</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Problem</label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Total Price (Tk)
          </label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        {/* Order Status */}
        <div>
          <label className="block font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Update Button */}
        <button
          type="button"
          onClick={handleUpdate}
          className="mx-auto w-full max-w-2xl rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Update Order
        </button>
      </form>
    </div>
  );
};

export default OnGoingOrderSinglePage;
