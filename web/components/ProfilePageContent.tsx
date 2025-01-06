"use client";
import { ProfileTableProps } from "@/lib/sanity/types";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dummy from "@/public/images/download.jpg";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";
import FeedSection from "./feedSection";
import ShortlistSection from "./ShortlistSection";
import SettingsSection from "./SettingsSection";
import LogOutSection from "./LogOutSection";
import Link from "next/link";

const ProfilePageContent = () => {
  const { user, loading, error } = useUser();
  const supabase = useSupabase();
  const [profileData, setprofileData] = useState<ProfileTableProps | null>(
    null
  );
  const [activeSection, setActiveSection] = useState("profile");
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);

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
          const completedSteps = data?.completed_steps || [];
          const totalSteps = 12;
          const percentage = Math.round((completedSteps / totalSteps) * 100);
          setCompletionPercentage(percentage);
        }
      }
    };

    fetchContactData();
  }, [user]);

  const handleLabelClick = (section: string) => {
    setActiveSection(section);
  };
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (completionPercentage / 100) * circumference;

  return (
    <>
      <div className="container">
        <div className="flex md:flex-row flex-col items-start md:items-center justify-between  gap-4 shadow-custom rounded-xl  mt-24 mb-12 p-4">
          <div className="flex items-start gap-4">
            <div className="">
              {profileData?.passport_pic ? (
                <Image
                  src={profileData?.passport_pic}
                  alt="profile pic"
                  width={80}
                  height={80}
                  className="rounded-lg w-full max-w-[120px] h-[120px] object-cover"
                />
              ) : (
                <Image
                  src={Dummy}
                  alt="profile pic"
                  width={80}
                  height={80}
                  className="rounded-lg w-full max-w-[120px] h-[120px] object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-brand-darkGreen">
                {profileData?.first_name || "Nishit Patel"}
              </h2>
              <p className="text-brand-lightBlack text-base">YM34111357</p>
              <p className="text-sm text-gray-400">Account Type</p>
              <p className="text-sm font-medium text-brand-cyan">
                Free Membership
              </p>
            </div>
          </div>
          <div className="flex items-start w-full max-w-[300px]">
            <div className="relative w-full max-w-[80px] md:max-w-[105px]">
              <svg
                width="100"
                height="100"
                viewBox="0 0 139 139"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[80px] md:max-w-[100px] h-[80px] md:h-[100px]"
              >
                <circle
                  cx="69.5"
                  cy="69.5"
                  r={circleRadius}
                  stroke="#E5E7EB"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="69.5"
                  cy="69.5"
                  r={circleRadius}
                  stroke="#01858B"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{
                    transition: "stroke-dashoffset 0.35s ease-out",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-teal-600 text-xl md:text-2xl font-bold">
                  {completionPercentage}%
                </span>
              </div>
            </div>
            <div className="ml-4">
              <p className="mt-2 text-[18px] sm:text-xl text-gray-500">
                Profile Completion
              </p>
              {completionPercentage !== 100 && (
                <Link href="/onboarding">
                  <button className="mt-2 text-white text-[16px] leading-[100%] font-medium border-[1px] border-transparent bg-brand-cyan hover:bg-transparent hover:border-brand-cyan hover:text-brand-cyan BasicTransition  px-4 py-2 rounded-lg">
                    Edit
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className=" flex lg:flex-row flex-col justify-between gap-8">
          <div className="bg-white shadow-custom rounded-xl p-4 sticky top-[78px] lg:top-[12%] z-20 h-fit  w-full max-w-full lg:max-w-[250px] border-[1px] border-brand-darkcyan/20  overflow-x-auto categoryScroll ">
            <ul className="flex flex-row lg:flex-col justify-between gap-2">
              {[
                { label: "Profile", key: "profile" },
                { label: "Feed", key: "feed" },
                { label: "Notification", key: "notification" },
                // { label: "Shortlist Profiles", key: "shortlist" },
                { label: "Setting", key: "setting" },
                { label: "Log Out", key: "logout" },
              ]?.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer font-medium text-gray-700 p-2 rounded-md w-full text-center lg:text-start whitespace-nowrap ${
                    activeSection === item.key
                      ? "bg-teal-100 text-teal-600"
                      : ""
                  } hover:bg-teal-50 transition`}
                  onClick={() => handleLabelClick(item?.key)}
                >
                  {item?.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <div className="bg-white shadow-md rounded-lg ">
              {activeSection === "profile" && (
                <ProfileSection profileData={profileData} />
              )}
              {activeSection === "feed" && <FeedSection />}
              {activeSection === "notification" && <NotificationSection />}
              {/* {activeSection === "shortlist" && <ShortlistSection />} */}
              {activeSection === "setting" && <SettingsSection />}
              {activeSection === "logout" && <LogOutSection />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageContent;
