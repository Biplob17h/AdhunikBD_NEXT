"use client";

import { useState, useEffect } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(1);
  const [token, setToken] = useState(null); // Store token in state

  // Get the token only in the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("AdhunikToken"));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token expired or invalid");
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          setUser(null);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refresh, token]);

  return { user, refresh, setRefresh, loading, setLoading, setUser };
};

export default useUser;
