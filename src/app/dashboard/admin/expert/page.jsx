"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";

export default function ExpertRequest() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
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
        setExperts(data.data.reverse());
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
    setTimeout(
      () => setNotification({ message: "", type: "", isVisible: false }),
      3000,
    );
  };

  const toggleVerification = async (id, currentStatus) => {
    const newStatus = currentStatus === "Verify" ? "Not Verify" : "Verify";

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
        throw new Error(
          result.message || "Failed to update verification status",
        );
      }

      setExperts((prevExperts) =>
        prevExperts.map((expert) =>
          expert._id === id ? { ...expert, verify: newStatus } : expert,
        ),
      );

      showNotification(`Expert status updated to "${newStatus}"`, "success");
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Failed to update status", "error");
    }
  };

  if (loading)
    return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  if (error)
    return <div className="min-h-screen bg-gray-100 p-6">Error: {error}</div>;

  const filteredExperts = experts.filter((expert) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      expert.name.toLowerCase().includes(query) ||
      expert.phone.toLowerCase().includes(query) ||
      expert.nid.toLowerCase().includes(query) ||
      expert.verify.toLowerCase().includes(query);

    const matchesFilter =
      filter === "all" ||
      (filter === "verified" && expert.verify === "Verify") ||
      (filter === "not-verified" && expert.verify === "Not Verify");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {notification.isVisible && (
        <div
          className={`fixed right-4 top-4 rounded-lg p-4 text-white ${notification.type === "success" ? "mt-[30px] bg-green-500" : "mt-[30px] bg-red-500"}`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <h2 className="text-xl font-bold opacity-60">Expert Request...</h2>

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

        {/* Filter Dropdown */}
        <select
          className="ml-4 rounded border px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="not-verified">Not Verified</option>
        </select>
      </div>

      {/* Expert Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredExperts.length > 0 ? (
          filteredExperts.map((expert) => (
            <div
              key={expert._id}
              className="relative flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md"
            >
              <img
                src={expert.photo}
                alt={expert.name}
                className="mb-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
              />
              <h3 className="text-lg font-semibold">{expert.name}</h3>
              <p className="text-sm text-gray-600">{expert.phone}</p>
              <p className="text-sm text-gray-600">{expert.nid}</p>

              {/* Verification Status Tag */}
              <span
                className={`absolute right-2 top-2 rounded px-3 py-1 text-xs font-bold text-white ${
                  expert.verify === "Verify" ? "bg-teal-500" : "bg-red-500"
                }`}
              >
                {expert.verify}
              </span>

              {/* Toggle Verification Button */}
              <button
                className={`mt-3 flex items-center gap-2 rounded px-3 py-1.5 text-sm text-white ${
                  expert.verify === "Verify" ? "bg-teal-500 " : " bg-red-500"
                } transition hover:opacity-80`}
                onClick={() => toggleVerification(expert._id, expert.verify)}
              >
                {expert.verify === "Verify" ? (
                    <FaCheck className="text-sm" />
                ) : (
                    <FaTimes className="text-sm" />
                )}
                {expert.verify}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No expert found.
          </div>
        )}
      </div>
    </div>
  );
}
