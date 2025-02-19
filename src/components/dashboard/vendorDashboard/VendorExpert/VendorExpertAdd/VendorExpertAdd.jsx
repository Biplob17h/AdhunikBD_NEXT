// components/AddExpertForm.js
import { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaIdCard,
  FaImage,
  FaCalendar,
  FaBriefcase,
} from "react-icons/fa";


const VendorExpertAdd = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [nid, setNid] = useState("");
  const [age, setAge] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const photoUrl = await hostPhoto(photo);
      setPhotoUrl(photoUrl);

      // Here you can handle the form submission, e.g., send data to an API
      const expertData = {
        name,
        number,
        nid,
        age,
        workExperience,
        photoUrl,
      };

      alert("Expert added successfully!");
    } catch (error) {
      console.error("Error adding expert:", error);
      alert("Failed to add expert.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">
            Add an Expert
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in the details to add a new expert.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Number Field */}
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                id="number"
                name="number"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            {/* NID Field */}
            <div className="relative">
              <FaIdCard className="absolute left-3 top-3 text-gray-400" />
              <input
                id="nid"
                name="nid"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="NID Card Number"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              />
            </div>

            {/* Age Field */}
            <div className="relative">
              <FaCalendar className="absolute left-3 top-3 text-gray-400" />
              <input
                id="age"
                name="age"
                type="number"
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Work Experience Field */}
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
              <input
                id="workExperience"
                name="workExperience"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Work Experience (in years)"
                value={workExperience}
                onChange={(e) => setWorkExperience(e.target.value)}
              />
            </div>

            {/* Photo Upload Field */}
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                id="photo"
                name="photo"
                type="file"
                required
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? "Adding Expert..." : "Add Expert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorExpertAdd;
