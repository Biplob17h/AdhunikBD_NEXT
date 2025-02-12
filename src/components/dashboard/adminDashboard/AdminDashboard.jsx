"use client";
import { useState } from "react";
import useUser from "@/hooks/UserHook";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import AdminHome from "./AdminHome/AdminHome";
import AdminUpdateProfile from "./AdminUpdateProfile/AdminUpdateProfile";
import ChangePassword from "@/components/shared/ChangePassword/ChangePassword";
import AdminOrders from "./AdminOrders/AdminOrders";
import AdminLocation from "./AdminLocation/AdminLocation";
import AdminService from "./AdminService/AdminService";
import AdminPromoCode from "./AdminPromoCode/AdminPromoCode";
import AdminOffers from "./AdminOffers/AdminOffers";
import AdminReport from "./AdminReport/AdminReport";

const AdminDashboard = () => {
  const [adminShow, setAdminShow] = useState("home");

  const { userLogout } = useUser();

  return (
    <div>
      <div>
        <AdminNavbar />
      </div>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-[450px] bg-white p-4 shadow-md">
          <h1 className="mb-4 text-center text-2xl font-bold">Admin Panel</h1>
          <nav className="flex flex-col gap-2">
            {/* Home Button */}
            <button
              onClick={() => setAdminShow("home")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "home"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Home
            </button>

            {/* Order button */}
            <button
              onClick={() => setAdminShow("order")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "order"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Orders
            </button>
            {/* Location button */}
            <button
              onClick={() => setAdminShow("location")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "location"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Location
            </button>
            {/* service button */}
            <button
              onClick={() => setAdminShow("service")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "service"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Service
            </button>
            {/* Report button */}
            <button
              onClick={() => setAdminShow("report")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "report"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Report
            </button>
            {/* Offers button */}
            <button
              onClick={() => setAdminShow("offers")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "offers"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Offers
            </button>
            {/* Promo Code button */}
            <button
              onClick={() => setAdminShow("promo")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "promo"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Promo Code
            </button>
            {/* Update Profile Button */}
            <button
              onClick={() => setAdminShow("update")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "update"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Update Profile
            </button>
            {/* Change Password Button */}
            <button
              onClick={() => setAdminShow("password")}
              className={`w-full rounded-md px-4 py-3 text-left text-lg font-medium transition-all ${
                adminShow === "password"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              Change Password
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
          <div className="">
            <AdminHome adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminOrders adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminLocation adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminService adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminReport adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminPromoCode adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminOffers adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
          <div className="">
            <AdminUpdateProfile
              adminShow={adminShow}
              setAdminShow={setAdminShow}
            />
          </div>
          <div className="">
            <ChangePassword adminShow={adminShow} setAdminShow={setAdminShow} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
