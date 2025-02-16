const { useState, useEffect } = require("react");

const useGetAllAgent = () => {
  const [agents, setAgents] = useState([]);
  const [agentLoading, setAgentsLoading] = useState(false);
  const [agentRef, setAgentRef] = useState(1);

  useEffect(() => {
    setAgentsLoading(true);
    fetch("/api/admin/agent")
      .then((response) => response.json())
      .then((data) => {
        setAgents(data?.data);
        setAgentsLoading(false);
      })
      .finally(() => {
        setAgentsLoading(false);
      });
  }, [agentRef]);

  return { agentLoading, agents, setAgentRef };
};

export default useGetAllAgent;
