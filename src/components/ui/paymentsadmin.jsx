"use client";
import { FaEdit, FaDownload } from "react-icons/fa";
import { useState } from "react";

export default function PaymentInfo() {
  const [comments, setComments] = useState("");

  return (
    <div className="min-h-screen p-6">
      <h2 className="pb-2 text-sm font-semibold opacity-70">PAYMENT INFO</h2>
      <div className="flex gap-6">
        {/* Payment table  */}
        <div className="flex-[2] rounded-lg p-6">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2 text-sm">#</th>
                  <th className="border p-2 text-sm">SERVICE NAME</th>
                  <th className="border p-2 text-sm">QUANTITY</th>
                  <th className="border p-2 text-sm">UNIT PRICE</th>
                  <th className="border p-2 text-sm">PRICE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 text-sm">1</td>
                  <td className="border p-2 text-sm">Kitchen Hood Cleaning</td>
                  <td className="border p-2 text-sm font-bold">1.00</td>
                  <td className="border p-2 text-sm">1500.00 Tk</td>
                  <td className="border p-2 text-sm">1500.00 Tk</td>
                </tr>
                <tr className="bg-gray-200 font-bold">
                  <td colSpan="4" className="border p-2 text-sm">
                    Total Price
                  </td>
                  <td className="border p-2 text-sm">1500 Tk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Info */}
        <div className="w-1/4 max-w-sm p-4">
          <h2 className="flex justify-center text-sm font-semibold opacity-70">
            Payment info
          </h2>
          <div className="mt-2 text-sm">
            <div className="flex justify-between pb-2">
              <span>Total Amount:</span>
              <span>$200</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2">
              <span>Discount:</span>
              <span>$20</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2">
              <span>Rounding Cut-Off:</span>
              <span>$0</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2">
              <span>Gross Amount:</span>
              <span>$180</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2">
              <span>Delivery Charge:</span>
              <span>$5</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2">
              <span>Paid Amount:</span>
              <span>$150</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2">
              <span>Due Amount:</span>
              <span>$35</span>
            </div>
            <hr className="border-t border-gray-400" />
            <div className="mt-2 flex justify-between pb-2 font-medium">
              <span>Payment Status:</span>
              <span className="text-green-500">Partial</span>
            </div>
            <hr className="border-t border-gray-400" />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-2 border border-black px-4 py-2 text-sm">
              <FaEdit /> Edit Cost
            </button>
          </div>
        </div>

        {/* Cost & Profit */}
        <div className="w-1/4 max-w-sm p-4">
          <h2 className="flex justify-center text-sm font-semibold opacity-70">
            Cost & Profit
          </h2>
          <div className="flex justify-between pb-2">
            <span className="text-sm">Total Cost:</span>
            <span className="text-sm">$10,000</span>
          </div>
          <hr className="border-t border-gray-400" />
          <div className="mt-2 flex justify-between pb-2">
            <span className="text-sm">Total Discount by Partner:</span>
            <span className="text-sm">-$2,000</span>
          </div>
          <hr className="border-t border-gray-400" />
          <div className="mt-2 flex justify-between pb-2">
            <span className="text-sm">GROSS COST:</span>
            <span className="text-sm">$8,000</span>
          </div>
          <div className="mt-4 flex justify-between">
            <button className="border border-black px-4 py-2 text-sm">
              Adjust Payment
            </button>
            <button className="flex items-center gap-2 border border-black px-4 py-2 text-sm">
              <FaDownload /> Download Quotation
            </button>
          </div>
        </div>
      </div>

      {/* Comments & Order Complaint Section */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="rounded-lg border-t-4 border-blue-500 bg-white p-4 shadow-md">
          <h3 className="mb-2 flex items-center text-lg font-semibold">
            Comments
          </h3>
          <div className="flex items-center gap-2">
            <img
              src="https://via.placeholder.com/40"
              alt="img"
              className="h-10 w-10 rounded-full"
            />
            <textarea
              className="w-full rounded border p-2"
              placeholder="Type comment..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <button className="flex items-center justify-center rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            Submit
            </button>
          </div>
        </div>

        <div className="rounded-lg border-t-4 border-red-500 bg-white p-4 shadow-md opacity-70">
          <h3 className="mb-2 flex items-center text-lg font-semibold">
             Order Complain
          </h3>
          <p className="text-center font-bold text-green-600">
            No complain. Hurray!
          </p>
        </div>
      </div>
    </div>
  );
}
