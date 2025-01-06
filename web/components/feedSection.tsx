import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import useProfileStore from "@/utils/store/useProfileStore";
import useProfiles from "@/utils/hooks/useProfile";
import DownArrow from "./commons/icons/downArrow";
import clsx from "clsx";
import { toast } from "sonner";

interface Profile {
  id: string;
  full_pic: string;
  first_name: string;
  interests?: string[];
  education: string;
  occupation: string;
  height: string;
  date_of_birth: string;
  marital_status: string;
  sub_community: string;
}

const FeedSection = () => {
  const supabase = useSupabase();
  const user = useUser();
  const { starredProfiles, addToFavorites, removeFromFavorites, getFavorites } =
    useProfileStore();
  const [recommendedProfiles, setRecommendedProfiles] = useState<Profile[]>([]);
  const [profileData, setprofileData] = useState<Profile[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "shortlisted">("all");

  const toggleStar = (profileId: string) => {
    if (starredProfiles.has(profileId)) {
      removeFromFavorites(profileId);
    } else {
      addToFavorites(profileId);
    }
  };

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const fetchRecommendedProfiles = async () => {
      if (!user?.user?.id) return;

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .not("id", "eq", user.user.id);

      if (profileError) {
        console.error("Error fetching profiles:", profileError);
        return;
      }

      setRecommendedProfiles(profiles);
    };

    fetchRecommendedProfiles();
  }, [user.user, supabase]);

  const handleSentRequest = async (receiverId: string) => {
    const { data: existingConnection } = await supabase
      .from("connections")
      .select("id, status")
      .or(`sender_id.eq.${user.user?.id},receiver_id.eq.${receiverId}`)
      .eq("receiver_id", receiverId)
      .eq("sender_id", user.user?.id)
      .single();

    if (existingConnection) {
      return new Response(
        JSON.stringify({ error: "Connection request already exists." }),
        { status: 400 }
      );
    }
    const { error } = await supabase.from("connections").insert([
      {
        sender_id: user.user?.id,
        receiver_id: receiverId,
        status: "pending",
      },
    ]);
    if (error) {
      console.log("Error sending connection request:", error);
    } else {
      setprofileData((prevData) =>
        prevData.filter((profile: Profile) => profile.id !== receiverId)
      );
      toast.success("Connection request sent successfully.");
    }
  };

  const filteredProfiles =
    viewMode === "shortlisted"
      ? recommendedProfiles.filter((profile) => starredProfiles.has(profile.id))
      : recommendedProfiles;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: "all" | "shortlisted") => {
    setViewMode(value);
    setIsOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-y-4 mb-2 lg:mb-6 pb-4">
        <h2 className="text-2xl lg:text-3xl font-medium text-teal-600">
          Recommended <span className="font-semibold">{filteredProfiles.length}</span> Profiles
        </h2>

        {/* Custom Dropdown */}
        <div className="relative inline-block text-left w-full max-w-[180px] ml-auto z-10">
          <button
            type="button"
            onClick={toggleDropdown}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-between gap-4 w-full"
          >
            {viewMode === "all" ? "All" : "Shortlisted"}
            <DownArrow className={clsx("w-[20px] h-[20px] transition-all", isOpen ? "rotate-180" : "rotate-0")} />
          </button>

          {/* Dropdown Menu */}
          <div
            className={clsx(
              "absolute right-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 transition-all duration-300",
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <button
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100 rounded-lg ${viewMode === "all" ? "bg-teal-600 text-white" : ""
                }`}
              onClick={() => handleSelect("all")}
            >
              All
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100 rounded-lg ${viewMode === "shortlisted" ? "bg-teal-600 text-white" : ""
                }`}
              onClick={() => handleSelect("shortlisted")}
            >
              Shortlisted
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile: Profile) => (
            <div
              key={profile.id}
              className="flex items-center justify-between pb-4 relative group bg-white p-5 sm:p-8 rounded-lg shadow-custom"
            >
              <div className="flex md:flex-row flex-col items-start gap-4 w-full">
                <div className="w-full max-w-full md:max-w-[300px] overflow-hidden rounded-lg">
                  <img
                    src={profile.full_pic}
                    alt="profile pic"
                    className="rounded-lg w-full max-w-full md:max-w-[300px] h-[200px] object-cover group-hover:scale-110 BasicTransition"
                  />
                </div>

                <div className="w-full">
                  <button
                    onClick={() => toggleStar(profile.id)}
                    aria-label="Toggle star"
                    className="star-checkbox absolute right-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill={starredProfiles.has(profile.id) ? "gold" : "none"}
                      stroke={starredProfiles.has(profile.id) ? "gold" : "gray"}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                  <h2 className="text-3xl capitalize font-semibold text-brand-lightBlack/70 mb-4 group-hover:text-brand-cyan transition-all">
                    {profile.first_name}
                  </h2>
                  <div className="flex xlg:flex-nowrap flex-wrap items-center gap-2 border-b-[1px] w-full pb-4 mb-4">
                    <span className="block whitespace-nowrap border-[1px] border-brand-oppla rounded-lg px-2 text-white bg-brand-oppla/50">
                      {profile.education}
                    </span>
                    <span className="block whitespace-nowrap border-[1px] border-brand-oppla rounded-lg px-2 text-white bg-brand-oppla/50">
                      {profile.occupation}
                    </span>
                    <span className="block whitespace-nowrap border-[1px] border-brand-oppla rounded-lg px-2 text-white bg-brand-oppla/50">
                      <span className="font-medium">height:</span>
                      {profile.height}
                    </span>
                    <span className="block whitespace-nowrap border-[1px] border-brand-oppla rounded-lg px-2 text-white bg-brand-oppla/50">
                      <span className="font-medium">age: </span>
                      {calculateAge(profile.date_of_birth)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 w-full max-w-[300px]">
                    <button className="bg-buttonGradient text-white text-xs px-2 py-1 rounded-lg hover:scale-105 transition-all">
                      <Link href={`/profile/${profile.id}`}>View Profile</Link>
                    </button>
                    <button
                      className="bg-buttonGradient text-white text-xs px-2 py-1 rounded-lg hover:scale-105 transition-all"
                      onClick={() => handleSentRequest(profile.id)}
                    >
                      Sent Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-brand-oppla text-center text-xl">No profiles available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedSection;
