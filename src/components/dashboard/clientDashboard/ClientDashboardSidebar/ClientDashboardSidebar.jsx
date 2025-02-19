"use client";
import useUser from "@/hooks/UserHook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ClientDashboardSidebar = () => {
  const [show, setShow] = useState("profile");
  const { setUser, userRef, setUserRef } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("AdhunikToken");
    setUser({});
    setUserRef(userRef + 1);
    router.push("/");
  };
  return (
    <div>
      <div className="min-h-screen pr-5">
        <button
          onClick={() => {
            setShow("profile"), router.push("/profile/user");
          }}
          className={`${show === "profile" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
        >
          Profile
        </button>
        <button
          onClick={() => {
            setShow("orders"), router.push("/profile/user/orders");
          }}
          className={`${show === "orders" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
        >
          Orders
        </button>
        <button
          onClick={() => {
            setShow("update"), router.push("/profile/user/updateProfile");
          }}
          className={`${show === "update" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
        >
          Update Profile
        </button>
        <button
          onClick={() => {
            setShow("report"), router.push("/profile/user/reports");
          }}
          className={`${show === "report" ? "bg-slate-500 text-white" : "bg-slate-200 text-black"} mb-3 w-full cursor-pointer rounded p-3 hover:bg-slate-500 hover:text-white`}
        >
          My Reports
        </button>
        <button
          onClick={() => {
            setShow("password"), router.push("/profile/user/password");
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
    </div>
  );
};

export default ClientDashboardSidebar;
