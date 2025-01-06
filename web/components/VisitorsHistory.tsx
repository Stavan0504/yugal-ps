import React, { useEffect, useState } from "react";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

interface Profile {
  id: string;
  first_name: string;
  passport_pic?: string;
  visitors?: string[]; 
  about_candidate?: string;
  city?: string;
  occupation?: string;
}

const VisitorsHistory = () => {
  const supabase = useSupabase();
  const user = useUser();
  const currentUserId = user.user?.id;

  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(
    null
  );
  const [visitorProfiles, setVisitorProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserId || !supabase) return;

      const { data: currentUserData, error: currentUserError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUserId)
        .single();

      if (currentUserError) {
        console.error("Error fetching current user profile:", currentUserError);
        return;
      }

      setCurrentUserProfile(currentUserData);

      const visitorIds = currentUserData?.visitors || [];

      if (visitorIds.length > 0) {
        const { data: visitorProfilesData, error: visitorProfilesError } =
          await supabase.from("profiles").select("*").in("id", visitorIds);

        if (visitorProfilesError) {
          console.error(
            "Error fetching visitor profiles:",
            visitorProfilesError
          );
          return;
        }

        setVisitorProfiles(visitorProfilesData || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUserId, supabase]);

  if (loading) return <div>Loading...</div>;
  if (!currentUserProfile) return <div>No profile data found.</div>;

  return (
    <div className="p-4 md:p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-teal-600 mt-6">
        Visitor History
      </h2>
      {visitorProfiles.length > 0 ? (
        visitorProfiles.map((visitor: Profile) => (
          <div
            key={visitor.id}
            className=" flex em:flex-row flex-col items-center gap-6 my-4 p-4 border border-gray-200 rounded-lg"
          >
            {visitor.passport_pic && (
              <Image
                src={visitor.passport_pic}
                alt={`${visitor.first_name}'s passport photo`}
                className="rounded-lg mt-2"
                width={100}
                height={100}
              />
            )}
          <div>
          <h3 className="text-xl md:text-2xl  leading-[110%] font-semibold text-brand-darkGreen">
              {visitor.first_name} visited your profile
            </h3>
            <button className="bg-teal-600 text-white px-2 py-1.5 rounded-lg  text-sm font-semibold mt-4 hover:bg-transparent border-[1px] hover:border-teal-600 border-transparent hover:text-teal-600 BasicTransition">
              <Link href={`/profile/${visitor.id}`}>View Profile</Link>
            </button>
          </div>
          </div>
        ))
      ) : (
        <p>No visitors found.</p>
      )}
    </div>
  );
};

export default VisitorsHistory;
