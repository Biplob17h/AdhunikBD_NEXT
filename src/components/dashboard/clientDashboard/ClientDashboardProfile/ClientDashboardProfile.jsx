"use client";

import React, { useEffect, useState } from "react";
import useUser from "@/hooks/UserHook";

const ClientDashboardProfile = ({ show }) => {
  const { user, refresh, loading } = useUser();
  const [userInfo, setUserInfo] = useState({});

  // Sync the user info with the `user` data from the hook
  useEffect(() => {
    !loading && setUserInfo(user);
  }, [user, refresh, loading]);

  const handleEditPhoto = () => {
    alert("Edit photo feature coming soon!");
  };

  return (
    <div
      className={`mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md ${show === "profile" ? "" : "hidden"}`}
    >
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Profile Information
      </h1>

      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
        {/* Profile Image */}
        <div className="relative">
          {userInfo?.photo ? (
            <img
              src={userInfo.photo}
              alt="User Avatar"
              className="h-32 w-32 rounded-full border-4 border-gray-300 object-cover shadow-sm md:h-40 md:w-40"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-300 bg-gray-200 shadow-sm md:h-40 md:w-40">
              <span className="text-xl text-gray-500">No Image</span>
            </div>
          )}
          <button
            onClick={handleEditPhoto}
            className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
          >
            <span className="text-sm font-medium text-blue-500">Edit</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-3 text-center md:mt-0 md:text-left">
          <h2 className="text-xl font-semibold text-gray-900">
            {userInfo?.name || "N/A"}
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{" "}
            {userInfo?.email || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span>{" "}
            {userInfo?.phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Date of Birth:</span>{" "}
            {userInfo?.dateOfBirth || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Gender:</span>{" "}
            {userInfo?.gender || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">NID:</span> {userInfo?.nid || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span>{" "}
            {userInfo?.address || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardProfile;
