'use client'
import useAdminOrder from "@/hooks/adminOrderHooks";
import { useRouter } from "next/navigation";

const AdminOngoingOrders = () => {
  const { onGoingOrders, orderLoading } = useAdminOrder();
  const router = useRouter();

  if (orderLoading) {
    return (
      <div className="flex items-center justify-center p-4 text-lg">
        Loading...
      </div>
    );
  }

  if (!onGoingOrders || onGoingOrders.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-lg">
        <p className="text-red-500 font-semibold">No ongoing orders found!</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Ongoing Orders</h2>
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <th className="px-6 py-4 text-left font-semibold">Customer</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">Address</th>
              <th className="px-6 py-4 text-left font-semibold">Order Date</th>
              <th className="px-6 py-4 text-left font-semibold">Total Price</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {onGoingOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="px-6 py-4 text-gray-800">{order.customerName}</td>
                <td className="px-6 py-4 text-gray-600">{order.customerEmail}</td>
                <td className="px-6 py-4 text-gray-600">{order.customerPhone}</td>
                <td className="px-6 py-4 text-gray-600">
                  {order.house}, {order.road}, {order.area}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 text-gray-800">{order.totalPrice || 0} Tk</td>
                <td className="px-6 py-4 text-blue-600">{order.status}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => router.push(`/dashboard/admin/order/ongoingOrder/${order._id}`)}
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 py-2 px-4 text-white font-semibold hover:from-blue-600 hover:to-blue-800 transition-all"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOngoingOrders;
