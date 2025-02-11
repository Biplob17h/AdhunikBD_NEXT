"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRef, setUserRef] = useState(0);
  const router = useRouter();

  const fetchUser = useCallback(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("AdhunikToken")
        : null;
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Token expired or invalid"),
      )
      .then((data) => {
        setUser(data.status === "success" ? data.user : null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Fetch user data on mount & refreshTrigger change
  useEffect(() => {
    fetchUser();
  }, [fetchUser, userRef]);

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem("AdhunikToken");
    setUserRef(userRef + 1);
    router.push("/");
  };

  return { user, userRef, setUserRef, loading, setUser, userLogout };
};

export default useUser;
