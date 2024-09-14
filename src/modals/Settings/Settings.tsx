import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { toast } from "@/components/Toaster";
import userService from "@/service/userService";
import { useAuth } from "@/context/useAuth";
import authService from "@/service/authService";

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { accessToken, user, saveToken } = useAuth();

  const [disableAnimations, setDisableAnimations] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [instrumentDLCQuests, setInstrumentDLCQuests] = useState(false);
  const [voicePropsDLCQuests, setVoicePropsDLCQuests] = useState(false);
  const [sunburnDLCQuests, setSunburnDLCQuests] = useState(false);
  // const [email, setEmail] = useState(user?.email || "");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (user?.metadata) {
      const settings = user.metadata;

      setDisableAnimations(settings.disableAnimations || false);
      setCategoryFilters(settings.categoryFilters || []);
      setInstrumentDLCQuests(settings.instrumentDLCQuests || false);
      setVoicePropsDLCQuests(settings.voicePropsDLCQuests || false);
      setSunburnDLCQuests(settings.sunburnDLCQuests || false);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!formRef.current) return;
      if (!accessToken) return;

      const settingsData = {
        disableAnimations,
        // categoryFilters,
        instrumentDLCQuests,
        voicePropsDLCQuests,
        sunburnDLCQuests,
        // email,
      };

      await userService.updateSettings(accessToken, settingsData);
      const { token } = await authService.refreshToken(accessToken);
      saveToken(token);

      onClose();

      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings", error);
    }
  };

  return (
    <div className="p-2 w-96">
      <h1 className="mb-4 text-xl font-semibold">Settings</h1>

      <form onSubmit={handleSubmit} ref={formRef}>
        {/* General Settings */}
        <h2 className="font-medium">General Settings</h2>
        <div className="mt-2 space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={disableAnimations}
              onChange={() => setDisableAnimations(!disableAnimations)}
            />
            <span>Disable Animations</span>
          </label>

          <label className="block">
            <span>Category Filters</span>
            <input
              type="text"
              value={categoryFilters}
              disabled={true}
              placeholder="this is disabled"
              onChange={(e) => setCategoryFilters(e.target.value.split(","))}
              className="block w-full p-2 mt-1 border rounded"
            />
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={instrumentDLCQuests}
              onChange={() => setInstrumentDLCQuests(!instrumentDLCQuests)}
            />
            <span>Show Instrument DLC Quests</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={voicePropsDLCQuests}
              onChange={() => setVoicePropsDLCQuests(!voicePropsDLCQuests)}
            />
            <span>Show Voice Props DLC Quests</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sunburnDLCQuests}
              onChange={() => setSunburnDLCQuests(!sunburnDLCQuests)}
            />
            <span>Show Sunburn DLC Quests</span>
          </label>
        </div>

        {/* Account Settings */}
        <h2 className="mt-6 font-medium">Account Settings</h2>
        <div className="mt-2 space-y-4">
          <p>commented out for now</p>
          {/* <label className="block">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 mt-1 border rounded"
            />
          </label> */}

          {/* <label className="block">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter new password"
              className="block w-full p-2 mt-1 border rounded"
            />
          </label>

          <label className="block">
            <span>Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm new password"
              className="block w-full p-2 mt-1 border rounded"
            />
          </label> */}
        </div>

        {/* Danger Zone */}
        <h2 className="mt-6 font-medium text-red-500">Danger Zone</h2>
        <div className="mt-2 space-y-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 rounded text-white-500"
            onClick={() => toast.warning("This has not been implemented yet")}
          >
            Reset all Quests
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Button text="Close" onClick={onClose} />
          <Button text="Save" htmlType="submit" type="confirm" />
        </div>
      </form>
    </div>
  );
}

export default Settings;
