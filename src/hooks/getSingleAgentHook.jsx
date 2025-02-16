import { useState, useEffect } from "react";

const useSingleAgent = (agentId) => {
  const [agent, setAgent] = useState(null);
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentRef, setAgentRef] = useState(0); // Start from 0 for refetching

  const fetchAgent = () => {
    if (!agentId) return;

    setAgentLoading(true);
    fetch(`/api/admin/agent`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setAgent(data.data);
        } else {
          setAgent(null); // Reset agent if error
          console.error("Error fetching agent:", data.message);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setAgent(null);
      })
      .finally(() => {
        setAgentLoading(false);
      });
  };

  useEffect(() => {
    fetchAgent();
  }, [agentId, agentRef]);

  return {
    agent,
    agentLoading,
    setAgentRef,
  };
};

export default useSingleAgent;
