"use client";

import { useEffect, useState } from "react";



const useGetUserById = (id) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data?.data))
      .finally(() => setLoading(false));
  }, []);

  return {user, loading};
};

export default useGetUserById;
