"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import useSettings from "@/hooks/getSettingsHook";
import { toast } from "react-hot-toast";

const SettingsPage = () => {
  const { settings, settingsLoading, setSettingsRef } = useSettings();
  const [localSettings, setLocalSettings] = useState({});

  useEffect(() => {
    if (settings?.home) {
      setLocalSettings({ ...settings.home }); // Ensure a new object is created
    }
  }, [settings]);

  // Toggle setting value inside home
  const handleToggle = (key) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save settings to the database
  const handleSave = async () => {
    if (!settings || !settings._id) {
      toast.error("Settings data is invalid.");
      return;
    }

    try {
      const updatedData = { _id: settings._id, home: localSettings };

      const res = await fetch("/api/setting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Settings updated successfully!");
        setSettingsRef((pre) => pre + 1);
      }
    } catch (error) {
      toast.error("Error updating settings.");
      console.error(error);
    }
  };

  if (settingsLoading) return <p>Loading settings...</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      {/* Settings List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.keys(localSettings).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            <Switch
              checked={localSettings[key]}
              onCheckedChange={() => handleToggle(key)}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} className="w-full max-w-48">
        Save Settings
      </Button>
    </div>
  );
};

export default SettingsPage;
