"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaTh, FaList, FaSearch } from "react-icons/fa";

// Photo upload function
const hostPhoto = async (photo) => {
  const photoData = new FormData();
  photoData.append("file", photo);
  photoData.append("upload_preset", "test-upload");
  photoData.append("cloud_name", "dqeuy96cs");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload",
      {
        method: "POST",
        body: photoData,
      },
    );

    const data = await response.json();
    return data?.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

export default function ResourcesDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter state
  const [filter, setFilter] = useState("all");

  // Notification state
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  // Form state for creating a new expert
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photo: null,
    photoUrl: "",
    nid: "",
    verify: "Not Verify",
  });

  // Fetch experts from the API
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vendor/expert");
        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }
        const data = await response.json();
        setExperts(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle photo file input
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the name field
    if (formData.name.length < 5) {
      showNotification("Name must be at least 5 characters long.", "error");
      return;
    }

    try {
      let photoUrl = "";

      // Upload photo to Cloudinary if a file is selected
      if (formData.photo) {
        photoUrl = await hostPhoto(formData.photo);
      }

      // Create the expert object
      const expertData = {
        name: formData.name,
        phone: formData.phone,
        photo: photoUrl,
        nid: formData.nid,
        verify: formData.verify,
      };

      // Send a POST request to the API
      const response = await fetch("http://localhost:3000/api/vendor/expert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expertData),
      });

      if (!response.ok) {
        throw new Error("Failed to create expert");
      }

      const newExpert = await response.json();

      // Update the experts state with the newly created expert
      setExperts([...experts, newExpert.data]);

      // Show success notification
      showNotification("Expert added successfully!", "success");

      // Close the form modal
      setIsFormOpen(false);

      // Reset the form data
      setFormData({
        name: "",
        phone: "",
        photo: null,
        photoUrl: "",
        nid: "",
        verify: "Not Verify",
      });
    } catch (error) {
      console.error("Error creating expert:", error);
      showNotification("Failed to create expert. Please try again.", "error");
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      isVisible: true,
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
        isVisible: false,
      });
    }, 3000);
  };

  // Filter experts based on search query and filter option
  const filteredExperts = experts.filter((expert) => {
    const query = searchQuery.toLowerCase();

    // Apply search filter
    const matchesSearch =
      expert.name.toLowerCase().includes(query) ||
      expert.phone.toLowerCase().includes(query) ||
      expert.nid.toLowerCase().includes(query) ||
      expert.verify.toLowerCase().includes(query);

    // Apply status filter
    const matchesFilter =
      filter === "all" ||
      (filter === "verified" && expert.verify === "Verify") ||
      (filter === "not-verified" && expert.verify === "Not Verify");

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Notification */}
      {notification.isVisible && (
        <div
          className={`fixed right-4 top-4 rounded-lg p-4 text-white ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600 opacity-60">
          RESOURCES
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Add Expert Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`rounded border px-2 py-1 ${
                filter === "all" ? "bg-teal-500 text-white" : "bg-white"
              }`}
            >
              All Experts
            </button>
            <button
              onClick={() => setFilter("verified")}
              className={`rounded border px-2 py-1 ${
                filter === "verified" ? "bg-teal-500 text-white" : "bg-white"
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter("not-verified")}
              className={`rounded border px-2 py-1 ${
                filter === "not-verified"
                  ? "bg-teal-500 text-white"
                  : "bg-white"
              }`}
            >
              Not Verified
            </button>
          </div>
          <div
            className="mt-[25px] flex h-[400px] cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 opacity-60 shadow-md"
            onClick={() => setIsFormOpen(true)}
          >
            <FaPlus size={50} className="text-gray-400" />
            <p className="text-gray-500 opacity-60">Add Resource</p>
          </div>
        </div>

        {/* Expert List Section */}
        <div className="col-span-2">
          <div className="mb-4 flex justify-between">
            <div className="relative">
              <input
                type="text"
                className="w-64 rounded border px-4 py-2"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setView("grid")}
                className={view === "grid" ? "text-blue-500" : "text-gray-500"}
              >
                <FaTh size={20} />
              </button>
              <button
                onClick={() => setView("list")}
                className={view === "list" ? "text-blue-500" : "text-gray-500"}
              >
                <FaList size={20} />
              </button>
            </div>
          </div>
          <div
            className={view === "grid" ? "grid grid-cols-3 gap-4" : "space-y-4"}
          >
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <div
                  key={expert._id}
                  className="relative flex flex-col items-center rounded-lg bg-white p-4 shadow-md"
                >
                  <img
                    src={expert.photo}
                    alt={expert.name}
                    className="mb-3 h-20 w-20 rounded-full object-cover"
                  />
                  <h3 className="text-lg font-semibold">{expert.name}</h3>
                  <p className="text-sm text-gray-600">{expert.phone}</p>
                  <p className="text-sm text-gray-600">{expert.nid}</p>
                  <span
                    className={`absolute right-2 top-2 rounded px-3 py-1 text-xs font-bold text-white ${
                      expert.verify === "Verify" ? "bg-teal-500" : "bg-red-500"
                    }`}
                  >
                    {expert.verify}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                No expert found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Expert Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Add Expert</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="mb-2 w-full rounded border p-2"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Number"
                className="mb-2 w-full rounded border p-2"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
                name="photo"
                className="mb-2 w-full rounded border p-2"
                onChange={handlePhotoChange}
              />
              <input
                type="text"
                name="nid"
                placeholder="NID"
                className="mb-2 w-full rounded border p-2"
                value={formData.nid}
                onChange={handleInputChange}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border px-4 py-2"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
