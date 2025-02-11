import FooterSection from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";
import React, { useState } from "react";
import ClientDashboardProfile from "./ClientDashboardProfile/ClientDashboardProfile";
import useUser from "@/hooks/UserHook";
import { useRouter } from "next/navigation";
import CLientDashboardOrder from "./CLientDashboardOrder/CLientDashboardOrder";
import ClientUpdateProfile from "./ClientUpdateProfile/ClientUpdateProfile";
import ClientAllReports from "./ClientAllReports/ClientAllReports";
import ChangePassword from "@/components/shared/ChangePassword/ChangePassword";

const ClientDashboard = () => {
  const [show, setShow] = useState("profile");
  const {  setUser,userRef, setUserRef } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("AdhunikToken");
    setUser({});
    setUserRef(userRef + 1);
    router.push("/");
  };
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex w-full px-[10%]">
        <div className="min-h-screen w-3/12 pr-5">
          <button
            onClick={() => {
              setShow("profile");
            }}
            className={`${show === "profile" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
          >
            Profile
          </button>
          <button
            onClick={() => {
              setShow("orders");
            }}
            className={`${show === "orders" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
          >
            Orders
          </button>
          <button
            onClick={() => {
              setShow("update");
            }}
            className={`${show === "update" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
          >
            Update Profile
          </button>
          <button
            onClick={() => {
              setShow("report");
            }}
            className={`${show === "report" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
          >
            My Reports
          </button>
          <button
            onClick={() => {
              setShow("password");
            }}
            className={`${show === "password" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
          >
            Change Password
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className={`${show === "logout" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full rounded p-3 hover:bg-slate-500 hover:text-white`}
          >
            Logout
          </button>
        </div>
        <div className="min-h-screen w-9/12">
          <ClientDashboardProfile show={show} />
          <CLientDashboardOrder show={show} />
          <ClientUpdateProfile show={show} setShow={setShow} />
          <ClientAllReports show={show} />
          <ChangePassword show={show} />
        </div>
      </div>
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

export default ClientDashboard;
