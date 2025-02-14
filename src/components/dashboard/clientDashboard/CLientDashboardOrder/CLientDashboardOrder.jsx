import useUser from "@/hooks/UserHook";
import useUserOrders from "@/hooks/userOrdersHook";
import { Card } from "@radix-ui/react-slot"; // For reusable card UI
import { Spinner } from "react-icons"; // Optional: To show loading spinner

const CLientDashboardOrder = ({ show }) => {
  const { user } = useUser();
  const { orders, orderLoading } = useUserOrders(user?._id);
  

  if (orderLoading) {
    return <div className="flex justify-center items-center p-4">Loading...</div>;
  }

  return (
    <div className={show === "orders" ? "" : "hidden"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {orders?.map((order) => (
          <div key={order._id} className="border rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-semibold text-gray-800">{order.subCategoryId?.subCategory}</h3>
            <p className="text-gray-600 text-sm">{order.customerEmail}</p>
            <p className="text-gray-600 text-sm">{order.customerPhone}</p>

            <div className="mt-4">
              <h4 className="font-medium text-gray-800">Order Details</h4>
              <p className="text-gray-600 text-sm">Location: {order.location}</p>
              <p className="text-gray-600 text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm">Problem: {order.problem}</p>
              <p className="text-gray-600 text-sm">Service: {order.service.name}</p>
              <p className="text-gray-600 text-sm">Time Slot: {order.time}</p>
              <p className="text-gray-600 text-sm">Total Price: ${order.totalPrice || order.service.price}</p>
            </div>

            <div className="mt-4">
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CLientDashboardOrder;
