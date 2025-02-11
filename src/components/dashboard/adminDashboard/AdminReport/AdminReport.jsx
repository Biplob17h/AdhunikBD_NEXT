import React, { useState } from "react";
import AdminNewReport from "./AdminNewReport/AdminNewReport";
import AdminOngoingReport from "./AdminOngoingReport/AdminOngoingReport";
import AdminSolvedReport from "./AdminSolvedReport/AdminSolvedReport";

const AdminReport = ({ adminShow, setAdminShow }) => {
  const [reportShow, setReportShow] = useState("new");

  return (
    <div className={`${adminShow === "report" ? "block" : "hidden"}`}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            reportShow === "new"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setReportShow("new")}
        >
          New Reports
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            reportShow === "ongoing"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setReportShow("ongoing")}
        >
          Ongoing Reports
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${
            reportShow === "solved"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } hover:border-blue-500`}
          onClick={() => setReportShow("solved")}
        >
          Solved Reports
        </button>
      </div>

      <div className={`${reportShow === "new" ? "block" : "hidden"}`}>
        <AdminNewReport />
      </div>
      <div className={`${reportShow === "ongoing" ? "block" : "hidden"}`}>
        <AdminOngoingReport />
      </div>
      <div className={`${reportShow === "solved" ? "block" : "hidden"}`}>
        <AdminSolvedReport />
      </div>
    </div>
  );
};

export default AdminReport;
