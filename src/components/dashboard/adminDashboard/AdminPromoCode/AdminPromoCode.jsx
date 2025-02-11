import React, { useState } from "react";
import AdminPromoCodeManage from "./AdminPromoCodeManage/AdminPromoCodeManage";
import AdminPromoCodeAdd from "./AdminPromoCodeAdd/AdminPromoCodeAdd";

const AdminPromoCode = ({ adminShow, setAdminShow }) => {
  const [promoShow, setPromoShow] = useState("manage");

  return (
    <div className={`${adminShow === "promo" ? "block" : "hidden"}`}>
      <div className="flex border-b-2 border-gray-300 mb-4">
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            promoShow === "manage" ? "border-blue-500 text-blue-500" : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setPromoShow("manage")}
        >
          Manage Promo Codes
        </button>
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            promoShow === "add" ? "border-blue-500 text-blue-500" : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setPromoShow("add")}
        >
          Add Promo Code
        </button>
      </div>

      <div className={`${promoShow === "manage" ? "block" : "hidden"}`}>
        <AdminPromoCodeManage/>
      </div>
      <div className={`${promoShow === "add" ? "block" : "hidden"}`}>
        <AdminPromoCodeAdd/>
      </div>
    </div>
  );
};

export default AdminPromoCode;
