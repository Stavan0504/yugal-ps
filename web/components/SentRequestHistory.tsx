import useProfiles from "@/utils/hooks/useProfile";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import React, { useEffect, useState } from "react";

interface Profile {
  id: string;
  passport_pic: string;
  first_name: string;
  city: string;
  occupation: string;
  height: string;
  date_of_birth: string;
}

interface ConnectionRequest {
  receiver_id: string;
  status: "pending" | "accepted" | "rejected";
}


const SentRequestHistory = () => {
  const supabase = useSupabase();
  const { user } = useUser();
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [receiverIds, setReceiverIds] = useState<string[]>([]);

  const { profiles, loading: profilesLoading } = useProfiles(receiverIds);

  useEffect(() => {
    const fetchSentRequests = async () => {
      if (!supabase || !user?.id) return;

      const { data, error } = await supabase
        .from("connections")
        .select("receiver_id, status")
        .eq("sender_id", user.id);

      if (error) {
        console.error("Error fetching sent requests:", error);
      } else {
        setSentRequests(data);
        setReceiverIds(data?.map((request: ConnectionRequest) => request.receiver_id) || []);
      }
    };

    fetchSentRequests();
  }, [supabase, user]);

  const getProfileName = (id: string, field: keyof Profile) => {
    const profile = profiles.find((p) => p.id === id);
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

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const pendingRequests = sentRequests.filter(
    (request) => request.status === "pending"
  );

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-medium text-brand-darkGreen">Sent Requests</h3>
      <div>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <div
              key={request.receiver_id}
              className="flex sm:flex-row flex-col items-start sm:items-center justify-between p-4 border-b w-full border-gray-200 gap-8"
            >

              <div className="flex sm:flex-row flex-col items-start sm:items-center  w-full gap-8">
                <img
                  src={getProfileName(request.receiver_id, "passport_pic")}
                  alt="profile pic"
                  className="rounded-lg w-full max-w-[150px] h-[120px] object-cover"
                />
                <div>
                  <p className="text-base text-brand-lightBlack font-semibold block">
                    {getProfileName(request.receiver_id, "first_name")}
                  </p>
                  <div className="flex flex-wrap  gap-4 gap-y-1 w-full max-w-[550px] mt-4">
                    <p className="text-base text-black">
                      <span className="font-semibold text-brand-darkGreen/50">City: </span>{getProfileName(request.receiver_id, "city")}
                    </p>
                    <p className="text-base text-black">
                      <span className="font-semibold text-brand-darkGreen/50">Occupation: </span>{getProfileName(request.receiver_id, "occupation")}
                    </p>


                    <p className="text-base text-black">
                      <span className="font-semibold text-brand-darkGreen/50">Height: </span>{getProfileName(request.receiver_id, "height")}
                    </p>
                    <p className="text-base text-black">
                      <span className="font-semibold text-brand-darkGreen/50">Age: </span>{getProfileName(request.receiver_id, "date_of_birth")
                        ? calculateAge(getProfileName(request.receiver_id, "date_of_birth"))
                        : "N/A"}
                    </p>

                  </div>
                </div>

              </div>
              <div>
                <p className="text-sm leading-[100%] text-[red] px-3 py-1.5 border-[1px] border-[red] rounded-full">{request.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No pending requests</p>
        )}
      </div>
    </div>
  );
};

export default SentRequestHistory;
