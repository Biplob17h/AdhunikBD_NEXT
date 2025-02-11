"use client";
import { useState } from "react";
import VendorHome from "./VendorHome/VendorHome";
import VendorOrder from "./VendorOrder/VendorOrder";
import VendorNavbar from "./VendorNavbar/VendorNavbar";
import VendorUpdateProfile from "./VendorUpdateProfile/VendorUpdateProfile";
import LocationAndService from "./LocationAndService/LocationAndService";
import useUser from "@/hooks/UserHook";

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
          <h1 className="mb-4 text-3xl font-bold">Vendor Dashboard</h1>
          <div className="">
            <VendorHome 
            vendorShow={vendorShow}
             setVendorShow={setVendorShow} />
            <VendorOrder
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
