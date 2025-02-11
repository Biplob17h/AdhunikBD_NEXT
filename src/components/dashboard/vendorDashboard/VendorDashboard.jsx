"use client";
import { useState } from "react";
import VendorHome from "./VendorHome/VendorHome";
import VendorOrder from "./VendorOrder/VendorOrder";
import VendorNavbar from "./VendorNavbar/VendorNavbar";
import VendorUpdateProfile from "./VendorUpdateProfile/VendorUpdateProfile";
import LocationAndService from "./LocationAndService/LocationAndService";
import useUser from "@/hooks/UserHook";
import ChangePassword from "@/components/shared/ChangePassword/ChangePassword";
import VendorExpert from "./VendorExpert/VendorExpert";
import VendorReport from "./VendorReport/VendorReport";
import VendorReview from "./VendorReview/VendorReview";

const VendorDashboard = () => {
  const [vendorShow, setVendorShow] = useState("home");

  const { userLogout } = useUser();

  return (
    <div>
      <div>
        <VendorNavbar />
      </div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-[450px] bg-white p-4 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold">Vendor Panel</h1>
          <nav className="flex flex-col gap-2">
            {/* Home Button */}
            <button
              onClick={() => setVendorShow("home")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "home"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Home
            </button>

            {/* Order button */}
            <button
              onClick={() => setVendorShow("order")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "order"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Orders
            </button>

            {/* Order button */}
            <button
              onClick={() => setVendorShow("expert")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "expert"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Experts
            </button>

            {/* Location and service button */}
            <button
              onClick={() => setVendorShow("location")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "location"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Location And Service
            </button>
            {/* Review button */}
            <button
              onClick={() => setVendorShow("review")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "review"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Reviews
            </button>
            {/* Reports button */}
            <button
              onClick={() => setVendorShow("report")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "report"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Reports
            </button>
            {/* Update Profile Button */}
            <button
              onClick={() => setVendorShow("update")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "update"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Update Profile
            </button>
            {/* Change Password Button */}
            <button
              onClick={() => setVendorShow("password")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                vendorShow === "password"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Change Password
            </button>
            {/* Logout Button */}
            <button
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all hover:bg-gray-200`}
              onClick={() => {
                userLogout();
              }}
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full p-6">
          
          <div className="">
            <VendorHome vendorShow={vendorShow} setVendorShow={setVendorShow} />
            <VendorOrder
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
            <VendorExpert
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
            <VendorReport
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
            <VendorReview
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
            <VendorUpdateProfile
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
            <LocationAndService
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
            <ChangePassword
              vendorShow={vendorShow}
              setVendorShow={setVendorShow}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
