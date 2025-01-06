import useProfiles from "@/utils/hooks/useProfile";
import useUser from "@/utils/hooks/useUser";
import React, { useState } from "react";

interface Settings {
  profilePhotoVisibility: string;
  profileVisibility: string;
  contactInfoPrivacy: boolean;
  activityVisibility: boolean;
}

const SettingsSection = () => {
  const [settings, setSettings] = useState<Settings>({
    profilePhotoVisibility: "All Users",
    profileVisibility: "Premium Only",
    contactInfoPrivacy: true,
    activityVisibility: false,
  });

  const handleDropdownChange = (setting: keyof Settings, value: string) => {
    setSettings((prev: Settings) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleToggle = (setting: keyof Settings) => {
    setSettings((prev: Settings) => ({
      ...prev,
      [setting]: !prev[setting as keyof Settings],
    }));
  };

  return (
    <div className="bg-white p-4 sm:p-8  rounded-lg shadow-lg  border border-gray-200">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
        <h2 className="text-2xl font-semibold text-teal-600">
          Privacy Settings
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div>
            <p className="font-semibold text-gray-700">
              Profile visible
            </p>
            <p className="text-sm text-gray-500">
              You can set-up who can able to view your profile.
            </p>
          </div>
          <div className="border rounded-lg px-4 py-2 text-gray-700 focus-within:border-blue-600 focus-within:border-[2px]">
            <select
              value={settings.profilePhotoVisibility}
              onChange={(e) =>
                handleDropdownChange("profilePhotoVisibility", e.target.value)
              }
              className="bg-transparent outline-none"
            >
              <option value="All Users">All Users</option>
              <option value="Premium Only">Premium Only</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div>
            <p className="font-semibold text-gray-700">Who can send you Interest requests?</p>
            <p className="text-sm text-gray-500">
              You can set-up who can able to make Interest request here.
            </p>
          </div>
          <div className="border rounded-lg px-4 py-2 text-gray-700 focus-within:border-blue-600 focus-within:border-[2px]">
            <select
              value={settings.profileVisibility}
              onChange={(e) =>
                handleDropdownChange("profileVisibility", e.target.value)
              }
              className="bg-transparent outline-none"
            >
              <option value="All Users">All Users</option>
              <option value="Premium Only">Premium Only</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div>
            <p className="font-semibold text-gray-700">
              Interest request
            </p>
            <p className="text-sm text-gray-500">
              Interest request email notificatios
            </p>
          </div>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 ${settings.contactInfoPrivacy ? "bg-teal-500" : "bg-gray-300"
              }`}
            onClick={() => handleToggle("contactInfoPrivacy")}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transform ${settings.contactInfoPrivacy ? "translate-x-6" : ""
                }`}
            ></div>
          </button>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div>
            <p className="font-semibold text-gray-700">New profile match</p>
            <p className="text-sm text-gray-500">
              You get the profile match emails
            </p>
          </div>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 ${settings.activityVisibility ? "bg-teal-500" : "bg-gray-300"
              }`}
            onClick={() => handleToggle("activityVisibility")}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transform ${settings.activityVisibility ? "translate-x-6" : ""
                }`}
            ></div>
          </button>
        </div>


      </div>
    </div>
  );
};

export default SettingsSection;
