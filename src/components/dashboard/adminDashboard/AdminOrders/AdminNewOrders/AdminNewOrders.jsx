import useAdminOrder from "@/hooks/adminOrderHooks";
import useUser from "@/hooks/UserHook";
import { useRouter } from "next/navigation";

const AdminNewOrders = () => {
  const { user } = useUser();
  const { newOrders, orderLoading } = useAdminOrder();
  const router = useRouter();

  if (orderLoading) {
    return (
      <div className="flex items-center justify-center p-4 text-lg">
        Loading...
      </div>
    );
  }

  if (!newOrders || newOrders.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-2xl">
        <p className="text-slate-800 font-semibold"> No new orders found!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {newOrders.map((newOrder) => (
          <div
            key={newOrder._id}
            className="rounded-xl border bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              {newOrder.customerName}
            </h2>
            <p className="text-sm text-gray-600">{newOrder.customerEmail}</p>
            <p className="text-sm text-gray-600">{newOrder.customerPhone}</p>

            <div className="mt-4">
              <h4 className="text-lg font-medium text-gray-800">Order Details</h4>
              <p className="text-gray-700">
                🏠 <span className="font-medium">Address:</span> {newOrder.house},{" "}
                {newOrder.road}, {newOrder.area}
              </p>
              <p className="text-gray-700">
                📍 <span className="font-medium">Location:</span> {newOrder.location}
              </p>
              <p className="text-gray-700">
                📅 <span className="font-medium">Date:</span>{" "}
                {newOrder.date ? new Date(newOrder.date).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-gray-700">
                ⚠️ <span className="font-medium">Problem:</span> {newOrder.problem}
              </p>
              <p className="text-gray-700">
                ⏰ <span className="font-medium">Time Slot:</span> {newOrder.time}
              </p>
              <p className="font-semibold text-gray-700">
                💵 <span className="font-medium">Total Price:</span> {newOrder.totalPrice || 0} Tk
              </p>
            </div>

            <div
              onClick={() => {
                router.push(`/dashboard/admin/order/newOrder/${newOrder?._id}`);
              }}
              className="mt-4"
            >
              <button className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNewOrders;
