import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { toast } from "@/components/Toaster";
import userService from "@/service/userService";
import { useAuth } from "@/context/useAuth";
import authService from "@/service/authService";
import categoryService from "@/service/categoryService";
import { Category } from "@/models/CategoryModels/categoryResponse";
import MultiSelect from "@/components/MultiSelect";

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { accessToken, user, saveToken } = useAuth();

  const [disableAnimations, setDisableAnimations] = useState(false);
  const [instrumentDLCQuests, setInstrumentDLCQuests] = useState(false);
  const [voicePropsDLCQuests, setVoicePropsDLCQuests] = useState(false);
  const [sunburnDLCQuests, setSunburnDLCQuests] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState<number[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!accessToken) return;
      const fetchedCategories = await categoryService.getCategories(accessToken);
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, [accessToken]);

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
        categoryFilters: categoryFilters.length === categories.length ? [] : categoryFilters,
        instrumentDLCQuests,
        voicePropsDLCQuests,
        sunburnDLCQuests,
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
    <div className="max-h-full w-full md:w-[500px]">
      <form onSubmit={handleSubmit} ref={formRef}>
        <h1 className="text-xl font-semibold">Settings</h1>

        {/* General Settings */}
        <div className="w-full p-2 mt-2 space-y-4 rounded bg-secondary-highlight">
          <h2 className="font-medium">General Settings</h2>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={disableAnimations}
              onChange={() => setDisableAnimations(!disableAnimations)}
            />
            <span>Disable Animations</span>
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

        {/* Category Filters */}
        <div className="p-2 mt-2 space-y-4 rounded bg-secondary-highlight">
          <h2 className="font-medium">Category Filters</h2>
          <p>Pick and choose if you only want some categories, the categories selected are the ones you will get quests for, selecting none will give you all quests.</p>
          <MultiSelect
            categories={categories}
            selectedCategories={categoryFilters}
            setSelectedCategories={setCategoryFilters} />
        </div>


        {/* Account Settings */}
        {/* <div className="p-2 mt-2 space-y-4 rounded bg-secondary-highlight">
          <h2 className="font-medium">Account Settings</h2>
          <div className="mt-2 space-y-4">
            <label className="block">
              <span>Email</span>
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 mt-1 border rounded"
            />
            </label>

            <label className="block">
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
            </label>
          </div>
        </div> */}

        {/* Danger Zone */}
        {/* <div className="p-2 mt-2 space-y-4 rounded bg-secondary-highlight">
          <h2 className="font-medium text-red-500">Danger Zone</h2>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 rounded text-white-500"
            onClick={() => toast.warning("This has not been implemented yet")}
          >
            Reset all Quests
          </button>
        </div> */}

        {/* Buttons */}
        <div className="flex flex-col items-start w-full gap-2 mt-2 sm:items-center sm:flex-row sm:justify-between">
          <Button
            onClick={onClose}
          >
            close
          </Button>
          <Button
            htmlType="submit"
            type="confirm"
          >
            save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
