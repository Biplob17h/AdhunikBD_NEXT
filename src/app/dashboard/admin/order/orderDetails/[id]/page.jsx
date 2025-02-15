
import { FaClipboardList, FaTruck, FaUser, FaPhone, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaHome, FaCog, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import PaymentInfo from "@/components/ui/paymentsadmin";

const OrderDetails = () => {
  return (
    <div>
        <div className=" bg-gray-100 p-6">
      {/* Order, Delivery & Resource Info */}
      <div className="mx-auto flex max-w-8xl flex-row gap-4 rounded-lg bg-white p-6 shadow-md">
        {/* Order Info */}
        <div className="flex-1 border-r pr-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 opacity-70">
            <FaClipboardList /> ORDER INFO
          </h2>
          <hr className="my-2" />
          <p className="text-sm">
            <span className="font-medium">Order ID:</span>
            <span className="ml-2 text-red-500 border">D-995890-18013</span>
          </p>
          <p className="text-sm mt-1">
            <span className="font-medium">Status:</span>
            <span className="ml-2 rounded bg-blue-500 px-2 py-1 text-white">Accepted</span>
          </p>
          <p className="text-sm mt-1 flex items-center gap-2">
            <FaClock /> <span className="font-medium">Ticket Created Time:</span> <span className="opacity-70">13 Feb, 2025 09:49 PM</span>
          </p>
          <p className="text-sm mt-1 flex items-center gap-2">
            <FaCalendarAlt /> <span className="font-medium">Delivered Date & Time:</span> <span className="opacity-70">13 Feb, 2025 09:49 PM</span>
          </p>
          <p className="text-sm mt-1 flex items-center gap-2">
            <FaHome /> <span className="font-medium">Where:</span>
            <span className="ml-2 rounded bg-blue-500 px-2 py-1 text-white">At Home</span>
          </p>
        </div>

        {/* Delivery Info */}
        <div className="flex-1 border-r px-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 opacity-70">
            <FaTruck /> DELIVERY INFO
          </h2>
          <hr className="my-2" />
          <p className="text-sm flex items-center gap-2">
            <FaUser /> <span className="font-medium">Delivery Name:</span> <span className="opacity-70">My Home</span>
          </p>
          <p className="text-sm mt-1 flex items-center gap-2">
            <FaPhone /> <span className="font-medium">Delivery Mobile:</span> <span className="opacity-70">+8801678027585</span>
          </p>
          <p className="text-sm mt-1 flex items-start gap-2">
            <FaMapMarkerAlt /> <span className="font-medium">Delivery Address:</span> <span className="opacity-70">Section 7, Mallika R/A, Pallabi, Dhaka</span>
          </p>
        </div>

        {/* Resource Info */}
        <div className="flex-1 pl-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 opacity-70">
            <FaUser /> RESOURCE INFO
          </h2>
          <hr className="my-2" />
          <p className="text-sm flex items-center gap-2">
            <FaUser /> <span className="font-medium">Name:</span> <span className="opacity-70">John Doe</span>
          </p>
          <p className="text-sm mt-1 flex items-center gap-2">
            <FaPhone /> <span className="font-medium">Mobile:</span> <span className="opacity-70">+8801837250222</span>
          </p>
          <div className="mt-2 flex">
            <button className="mr-2 rounded bg-blue-500 px-4 py-1 text-white flex items-center gap-2">
              <FaCog /> Change
            </button>
            <button className="rounded bg-green-500 px-4 py-1 text-white flex items-center gap-2">
              <FaEye /> View
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 max-w-8xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold opacity-70">Actions</h2>
        <div className="mt-2 flex gap-2">
          <button className="rounded bg-green-500 px-4 py-2 text-white flex items-center gap-2">
            <FaCheckCircle /> Process
          </button>
          <button className="rounded bg-red-500 px-4 py-2 text-white flex items-center gap-2">
            <FaTimesCircle /> Request Cancel
          </button>
        </div>
      </div>

      {/* Service List */}
      <div className="mt-6 max-w-8xl mx-auto bg-white p-4 rounded-lg shadow-md opacity-70">
        <h2 className="text-lg font-semibold">SERVICE LIST</h2>
        <div className="mt-4 rounded-lg bg-gray-200 p-4">
          <p className="text-sm flex items-center gap-2">
            <FaCalendarAlt /> <span className="font-medium">Schedule Date:</span> <span className="opacity-70"> 15-Feb-2025</span>
          </p>
          <p className="text-sm mt-1 flex items-center gap-2">
            <FaClock /> <span className="font-medium">Preferred Time:</span> <span className="opacity-70"> 10:00 AM - 11:00 AM</span>
          </p>
          <p className="text-sm mt-1 font-medium text-blue-600 flex items-center gap-2">
            <FaClipboardList /> Kitchen Hood Cleaning
          </p>
        </div>
      </div>
    </div>


    {/* PAYMENTS DETAILS SECTION */}
    <PaymentInfo/>
    </div>
  );
};

export default OrderDetails;
