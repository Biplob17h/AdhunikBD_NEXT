const { useState, useEffect } = require("react");

const useGetAllUser = () => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userRef, setUserRef] = useState(1);

  useEffect(() => {
    setUserLoading(true);
    fetch("/api/user/all")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.data);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setUserLoading(false));
  }, [userRef]);

  return { users, userRef, setUserRef, userLoading };
};

export default useGetAllUser;
