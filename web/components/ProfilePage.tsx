"use client";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dummy from "@/public/images/download.jpg";
import ProfileSection from "@/components/ProfileSection";
import NotificationSection from "@/components/NotificationSection";
import ShortlistSection from "@/components/ShortlistSection";
import SettingsSection from "@/components/SettingsSection";
import LogOutSection from "@/components/LogOutSection";
import { ProfileTableProps } from "@/lib/sanity/types";
import Footer from "@/components/footer";

export default function ProfilePage() {
  const { user, loading, error } = useUser();
  const supabase = useSupabase();
  const [profileData, setprofileData] = useState<ProfileTableProps | null>(
    null
  );
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const fetchContactData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user?.id)
          .single();

        if (error) {
          console.log("Error fetching contact data:", error);
        } else {
          setprofileData(data);
        }
      }
    };

    fetchContactData();
  }, []);

  const handleLabelClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 mt-20">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20">
            {profileData?.passport_pic ? (
              <Image
                src={profileData?.passport_pic}
                alt="profile pic"
                width={80}
                height={80}
                className="rounded-lg"
              />
            ) : (
              <Image
                src={Dummy}
                alt="profile pic"
                width={80}
                height={80}
                className="rounded-lg"
              />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {profileData?.first_name || "Nishit Patel"}
            </h2>
            <p className="text-gray-500">YM34111357</p>
            <p className="text-sm text-gray-400">Account Type</p>
            <p className="text-sm font-medium text-green-500">
              Free Membership
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className="relative">
            <svg
              width="80"
              height="80"
              viewBox="0 0 139 139"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="69.5"
                cy="69.5"
                r="60"
                stroke="#01858B"
                strokeWidth="14"
                fill="none"
                strokeDasharray="377"
                strokeDashoffset="94"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-teal-600 text-xl font-bold">75%</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Profile Completion</p>
          <button className="mt-2 text-teal-500 text-sm font-medium">
            Edit
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-4 flex">
        <div className="w-1/4 bg-white shadow-md rounded-lg p-4">
          <ul className="space-y-6">
            {[
              { label: "Profile", key: "profile" },
              { label: "Notification", key: "notification" },
              { label: "Shortlist Profiles", key: "shortlist" },
              { label: "Setting", key: "setting" },
              { label: "Log Out", key: "logout" },
            ]?.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer font-medium text-gray-700 p-2 rounded-md ${
                  activeSection === item.key ? "bg-teal-100 text-teal-600" : ""
                } hover:bg-teal-50 transition`}
                onClick={() => handleLabelClick(item?.key)}
              >
                {item?.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 ml-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            {activeSection === "profile" && (
              <ProfileSection profileData={profileData} />
            )}
            {activeSection === "notification" && <NotificationSection />}
            {activeSection === "shortlist" && <ShortlistSection />}
            {activeSection === "setting" && <SettingsSection />}
            {activeSection === "logout" && <LogOutSection />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
