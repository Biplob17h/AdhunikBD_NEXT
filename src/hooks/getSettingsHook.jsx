'use client'
import { useEffect, useState } from "react"

const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsRef, setSettingsRef] = useState(1);

  useEffect(() => {
    setSettingsLoading(true);
    fetch("/api/setting")
      .then((response) => response.json())
      .then((data) => {
        setSettings(data?.data);
        setSettingsLoading(false);
      });
  }, [settingsRef]);

  return { settings, settingsLoading, setSettingsRef };
};

export default useSettings;
