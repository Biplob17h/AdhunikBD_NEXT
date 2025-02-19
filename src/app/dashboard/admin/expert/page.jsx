"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function ExpertRequest() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vendor/expert");
        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }
        const data = await response.json();
        // Only show "Not Verify" experts
        const notVerifiedExperts = data.data.filter(expert => expert.verify === "Not Verify");
        setExperts(notVerifiedExperts.reverse());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => setNotification({ message: "", type: "", isVisible: false }), 3000);
  };

  const toggleVerification = async (id) => {
    const newStatus = "Verify"; // Only updating "Not Verify" to "Verify"

    try {
      const response = await fetch(
        `http://localhost:3000/api/vendor/expert?id=${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verify: newStatus }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update verification status");
      }

      // Remove the verified expert from the list
      setExperts((prevExperts) => prevExperts.filter(expert => expert._id !== id));

      showNotification(`Expert marked as "Verify"`, "success");
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Failed to update status", "error");
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  if (error) return <div className="min-h-screen bg-gray-100 p-6">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {notification.isVisible && (
        <div
          className={`fixed right-4 top-4 rounded-lg p-4 text-white ${
            notification.type === "success" ? " bg-green-500 mt-[50px]" : "mt-[50px] bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <h2 className="text-xl font-bold opacity-60">Expert Requests (Not Verified)</h2>

        {/* Search Input */}
        <div className="relative mt-3 md:mt-0">
          <input
            type="text"
            className="w-full rounded border px-4 py-2 md:w-64"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Table Design */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">NID</th>
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
  {experts
    .filter(
      (expert) =>
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.nid.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((expert) => (
      <tr key={expert._id} className="border-b hover:bg-gray-100">
        <td className="px-4 py-2">
          <img
            src={expert.photo}
            alt={expert.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </td>
        <td className="px-4 py-2">{expert.name}</td>
        <td className="px-4 py-2">{expert.phone}</td>
        <td className="px-4 py-2">{expert.nid}</td>
        <td className="px-4 py-2">{expert.vendor.vendorName}</td>
        <td className="px-4 py-2 text-center">
          <button
            className="flex items-center gap-2 rounded bg-red-500 px-3 py-1.5 text-sm text-white transition hover:opacity-80"
            onClick={() => toggleVerification(expert._id)}
          >
            <FaTimes className="text-sm" />
            Not Verified
          </button>
        </td>
      </tr>
    ))}
</tbody>
        </table>
      </div>
    </div>
  );
}
