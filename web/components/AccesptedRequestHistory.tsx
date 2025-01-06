import useProfiles from "@/utils/hooks/useProfile";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Profile {
  id: string;
  first_name: string;
  passport_pic?: string;
  occupation?: string;
  city?: string;
  height?: string;
  date_of_birth?: string;
}

interface ConnectionRequest {
  sender_id: string;
  receiver_id: string;
  status: string;
}

function AcceptedRequestHistory() {
  const { user } = useUser();
  const supabase = useSupabase();
  const [acceptedRequests, setAcceptedRequests] = useState<ConnectionRequest[]>(
    []
  );
  const [participantIds, setParticipantIds] = useState<string[]>([]);

  const { profiles, loading: profilesLoading } = useProfiles(participantIds);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("connections")
        .select("sender_id, receiver_id")
        .eq("status", "accepted")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

      if (error) {
        console.error("Error fetching accepted requests:", error);
        return;
      }

      setAcceptedRequests(data || []);

      const ids = new Set<string>(
        data.flatMap((request: ConnectionRequest) =>
          [request.sender_id, request.receiver_id].filter(
            (id) => id !== undefined
          )
        )
      );
      setParticipantIds(Array.from(ids));
    };

    fetchAcceptedRequests();
  }, [user, supabase]);

  const getProfileName = (id: string, field: keyof Profile) => {
    const profile = profiles.find((p: Profile) => p.id === id);
    return profile
      ? profile[field] || "Unknown"
      : profilesLoading
        ? "Loading..."
        : "N/A";
  };

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-medium text-brand-darkGreen">
        Accepted Requests
      </h3>
      {profilesLoading ? (
        <p>Loading profiles...</p>
      ) : (
        <div>
          {acceptedRequests.map((request, index) => {
            const participantId =
              request.sender_id === user?.id
                ? request.receiver_id
                : request.sender_id;

            const participantProfile = profiles.find(
              (profile: Profile) => profile.id === participantId
            );
            return (

              <div
                key={request.sender_id}
                className="flex sm:flex-row flex-col items-start sm:items-center justify-between p-4 border-b w-full border-gray-200 gap-8"
              >
                <div className="flex sm:flex-row flex-col items-start sm:items-center  w-full gap-8">
                  <img
                    src={participantProfile?.passport_pic}
                    alt="profile pic"
                    className="rounded-lg w-full max-w-[150px] h-[120px] object-cover"
                  />
                  <div>
                    <p className="text-base text-brand-lightBlack font-semibold block">
                      {participantProfile?.first_name || "Unknown User"}
                    </p>
                    <div className="flex flex-wrap  gap-4 gap-y-1 w-full max-w-[550px] mt-2">
                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">City: </span>{participantProfile?.city || "Unknown User"}
                      </p>
                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">Occupation: </span>  {participantProfile?.occupation || "Unknown User"}
                      </p>

                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">Height: </span>{(participantProfile?.height || "height")}
                      </p>
                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">Age: </span>{getProfileName(participantProfile?.date_of_birth, "date_of_birth")
                          ? calculateAge(participantProfile?.date_of_birth)
                          : "N/A"}
                      </p>
                    </div>
                    <button className="bg-teal-600 text-white px-2 py-1.5 rounded-lg  text-sm font-semibold mt-4 hover:bg-transparent border-[1px] hover:border-teal-600 border-transparent hover:text-teal-600 BasicTransition">
                      <Link href={`/profile/${participantId}`}>
                        View Profile
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AcceptedRequestHistory;
