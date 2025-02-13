import React, { useState } from "react";
import VendorNewReport from "./VendorNewReport/VendorNewReport";
import VendorOngoingReport from "./VendorOngoingReport/VendorOngoingReport";
import VendorFinishedReport from "./VendorFinishedReport/VendorFinishedReport";

const VendorReport = ({ vendorShow, setVendorShow }) => {
  const [reportShow, setReportShow] = useState("new");

  return (
    <div className={`${vendorShow === "report" ? "block" : "hidden"}`}>
      <div className="mb-4 flex border-b-2 border-gray-300">
        <button
          className={`flex-1 border-b-2 py-2 text-center ${reportShow === "new" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setReportShow("new")}
        >
          New
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${reportShow === "ongoing" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setReportShow("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`flex-1 border-b-2 py-2 text-center ${reportShow === "finished" ? "border-blue-500 text-blue-500" : "border-transparent"} hover:border-blue-500`}
          onClick={() => setReportShow("finished")}
        >
          Finished
        </button>
      </div>

      <div className={`${reportShow === "new" ? "block" : "hidden"}`}>
        <VendorNewReport />
      </div>
      <div className={`${reportShow === "ongoing" ? "block" : "hidden"}`}>
        <VendorOngoingReport />
      </div>
      <div className={`${reportShow === "finished" ? "block" : "hidden"}`}>
        <VendorFinishedReport />
      </div>
    </div>
  );
};

export default VendorReport;
