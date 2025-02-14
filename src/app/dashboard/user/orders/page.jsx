"use client";
import useUser from "@/hooks/UserHook";
import useUserOrders from "@/hooks/userOrdersHook";
import { Card } from "@radix-ui/react-slot"; // For reusable card UI
import { useRouter } from "next/navigation";
import { Spinner } from "react-icons"; // Optional: To show loading spinner

const CLientDashboardOrder = () => {
  const { user } = useUser();
  const { orders, orderLoading } = useUserOrders(user?._id);
  const router = useRouter();

  if (orderLoading) {
    return (
      <div className="flex items-center justify-center p-4">Loading...</div>
    );
  }

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          {orders?.map((order) => (
            <div key={order._id} className="rounded-lg border p-4 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                {order.subCategoryId?.subCategory}
              </h3>
              <p className="text-sm text-gray-600">{order.customerEmail}</p>
              <p className="text-sm text-gray-600">{order.customerPhone}</p>

              <div className="mt-4">
                <h4 className="font-medium text-gray-800">Order Details</h4>
                <p className="text-sm text-gray-600">
                  Location: {order.location}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Problem: {order.problem}
                </p>
                <p className="text-sm text-gray-600">
                  Service: {order.service.name}
                </p>
                <p className="text-sm text-gray-600">Time Slot: {order.time}</p>
                <p className="text-sm text-gray-600">
                  Total Price: ${order.totalPrice || order.service.price}
                </p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    router.push(`/dashboard/user/single/${order?._id}`);
                  }}
                  className="w-full rounded-lg bg-blue-500 py-2 text-white"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CLientDashboardOrder;
