import useProfiles from "@/utils/hooks/useProfile";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Profile {
  id: string;
  passport_pic: string;
  first_name: string;
  city: string;
  occupation: string;
  height: string;
}

interface ConnectionRequest {
  id: string;
  sender_id: string;
  status: "pending" | "accepted" | "rejected";
}

const ReceiveRequestHistory = () => {
  const supabase = useSupabase();
  const [receivedRequests, setReceivedRequests] = useState<ConnectionRequest[]>(
    []
  );
  const [receiverIds, setReceiverIds] = useState<string[]>([]);

  const { profiles, loading: profilesLoading } = useProfiles(receiverIds);

  const { user } = useUser();
  useEffect(() => {
    const fetchSentRequests = async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("connections")
        .select("sender_id, status,id")
        .eq("receiver_id", user?.id);

      if (error) {
        console.log("Error fetching sent requests:", error);
      } else {
        const ids = data.map((request: ConnectionRequest) => request.sender_id);
        setReceivedRequests(data);
        setReceiverIds(ids);
      }
    };

    fetchSentRequests();

    // const channel = supabase
    //   .channel("sent-requests")
    //   .on(
    //     "postgres_changes",
    //     { event: "INSERT", schema: "public", table: "connections" },
    //     async (payload) => {
    //       if (
    //         payload.new.sender_id ===
    //         (await supabase.auth.getUser()).data.user?.id
    //       ) {
    //         setSentRequests((prev) => [...prev, payload.new]);
    //       }
    //     }
    //   )
    //   .on(
    //     "postgres_changes",
    //     { event: "UPDATE", schema: "public", table: "connections" },
    //     (payload) => {
    //       setSentRequests((prev) =>
    //         prev.map((req) =>
    //           req.id === payload.new.id ? { ...req, ...payload.new } : req
    //         )
    //       );
    //     }
    //   )
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [supabase, user]);

  const handleAction = async (connectionId: string, status: string) => {
    const { error } = await supabase
      .from("connections")
      .update({ status })
      .eq("id", connectionId);

    if (error) {
      console.error("Error updating connection:", error);
    }
    setReceivedRequests((prev) =>
      prev.filter((req) => req.id !== connectionId)
    );
  };

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-medium text-brand-darkGreen">
        Receive Request History
      </h3>
      <div>
        {receivedRequests.map((request) => {
          const senderProfile = profiles?.find(
            (p) => p.id === request.sender_id
          )?.passport_pic;

          return (
            request.status === "accepted" && (
              <div
                key={request.sender_id}
                className="flex sm:flex-row flex-col items-start sm:items-center justify-between p-4 border-b border-gray-200 gap-4"
              >
                <div className="flex sm:flex-row flex-col items-start sm:items-center  w-full gap-8">
                  {senderProfile && (
                    <Image
                      src={senderProfile}
                      alt={"profile pic"}
                      width={100}
                      height={100}
                      className="rounded-lg w-full max-w-[150px] h-[120px] object-cover"
                    />
                  )}

                  <div>
                    <p className="text-base text-brand-lightBlack font-semibold block">
                      {
                        profiles?.find((p) => p.id === request.sender_id)
                          ?.first_name
                      }
                    </p>
                    <div className="flex flex-wrap  gap-4 gap-y-1 w-full max-w-[550px] mt-2">
                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">
                          City:{" "}
                        </span>{" "}
                        {
                          profiles?.find((p) => p.id === request.sender_id)
                            ?.city
                        }
                      </p>
                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">
                          Occupation:{" "}
                        </span>{" "}
                        {
                          profiles?.find((p) => p.id === request.sender_id)
                            ?.occupation
                        }
                      </p>

                      <p className="text-base text-black">
                        <span className="font-semibold text-brand-darkGreen/50">
                          Height:{" "}
                        </span>{" "}
                        {
                          profiles?.find((p) => p.id === request.sender_id)
                            ?.height
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="text-base font-bold rounded-lg bg-brand-cyan text-white px-4 py-1.5 hover:border-brand-cyan border-[1px] border-transparent hover:bg-transparent hover:text-brand-cyan BasicTransition"
                    onClick={() => handleAction(request.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="text-base font-bold rounded-lg bg-[red]/[85%] text-white px-4 py-1.5 hover:border-[red] border-[1px] border-transparent hover:bg-transparent hover:text-[red] BasicTransition"
                    onClick={() => handleAction(request.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default ReceiveRequestHistory;
