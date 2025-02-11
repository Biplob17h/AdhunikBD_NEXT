import React, { useState } from "react";
import AdminOffersManage from "./AdminOffersManage/AdminOffersManage";
import AdminOffersAdd from "./AdminOffersAdd/AdminOffersAdd";

const AdminOffers = ({ adminShow, setAdminShow }) => {
  const [offerShow, setOfferShow] = useState("manage");

  return (
    <div className={`${adminShow === "offers" ? "block" : "hidden"}`}>
      <div className="flex border-b-2 border-gray-300 mb-4">
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            offerShow === "manage" ? "border-blue-500 text-blue-500" : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setOfferShow("manage")}
        >
          Manage Offers
        </button>
        <button
          className={`flex-1 py-2 text-center border-b-2 ${
            offerShow === "add" ? "border-blue-500 text-blue-500" : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setOfferShow("add")}
        >
          Add Offer
        </button>
      </div>

      <div className={`${offerShow === "manage" ? "block" : "hidden"}`}>
        <AdminOffersManage/>
      </div>
      <div className={`${offerShow === "add" ? "block" : "hidden"}`}>
        <AdminOffersAdd/>
      </div>
    </div>
  );
};

export default AdminOffers;
