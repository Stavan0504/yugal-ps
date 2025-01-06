"use client";
import React, { useEffect, useState } from "react";
import useSupabase from "@/utils/hooks/useSupabase";
import Image from "next/image";
import useUser from "@/utils/hooks/useUser";
import Header from "@/components/header";
import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";
import { HeaderDataProps, ProfileTableProps } from "@/lib/sanity/types";
import PhoneIcon from "@/components/commons/icons/phoneIcon";
import EmailIcon from "@/components/commons/icons/emailIcon";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Params {
  id: string;
}

interface Profile {
  id: string;
  full_pic: string;
  first_name: string;
  passport_pic: string;
  city: string;
  date_of_birth: string;
  height: string;
  occupation: string;
  about_candidate: string;
  contact_no: string;
  email: string;
  weight: string;
  religion: string;
  annual_income: string;
  blood_group: string;
  community: string;
  education: string;
  father_name: string;
  mother_name: string;
  health_information: string;
  marital_status: string;
  mother_tongue: string;
  diet_type: string;
  visitors: string[];
}

const ProfileDetail = ({ params }: { params: Promise<Params> }) => {
  const { id } = React.use(params);
  const supabase = useSupabase();
  const [profile, setProfile] = useState<ProfileTableProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<Profile[]>([]);
  const user = useUser();
  const CuserId = user.user?.id;

  const [headerData, setHeaderData] = useState<HeaderDataProps | null>(null);
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await client.fetch(query.layoutProps);
        setHeaderData(data.header);
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };
    fetchHeaderData();
  }, []);

  useEffect(() => {
    const incrementVisitors = async () => {
      if (supabase && id && CuserId && id !== CuserId) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("visitors")
            .eq("id", id)
            .single();

          if (error) {
            console.error("Error fetching visitors:", error);
            return;
          }

          const currentVisitors = data?.visitors || [];
          if (!currentVisitors.includes(CuserId)) {
            const updatedVisitors = [...currentVisitors, CuserId];

            const { error: updateError } = await supabase
              .from("profiles")
              .update({ visitors: updatedVisitors })
              .eq("id", id);

            if (updateError) {
              console.error("Error updating visitors:", updateError);
            } else {
              console.log("Visitor successfully added to the profile.");
            }
          }
        } catch (err) {
          console.error("Unexpected error during visitors update:", err);
        }
      }
    };

    incrementVisitors();
  }, [id, supabase, CuserId]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (supabase && id) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            setLoading(false);
          } else {
            setProfile(data);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error during profile fetch:", err);
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [id, supabase]);

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
      setProfileData((prevData) =>
        prevData.filter((profile: Profile) => profile.id !== receiverId)
      );
      toast.success("connection request sent successfully");
      confirm("Connection request sent successfully.");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found.</div>;

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
    <div className="">
      {headerData && (
        <Header logo={headerData?.logo} label={headerData?.label} />
      )}
      <div className="mt-12">
        {profile?.passport_pic && (
          <div className=" lg:float-left lg:h-[100vh] left-0 bottom-0 lg:fixed w-full lg:w-[50%] top-0 py-12 bg-brand-oppla/20">
            <div className="w-full lg:absolute inset-0">
              <Image
                src={profile.passport_pic}
                alt={`${profile.first_name}'s profile`}
                className="rounded-lg  max-w-[450px] mx-auto lg:mx-auto lg:max-w-full w-full h-full object-cover"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        <div className="px-4 lg:px-0">
          <div className="w-full max-w-[800px] lg:max-w-full mx-auto lg:mx-0 mt-[-5%] lg:mt-0 lg:w-[50%] lg:ml-[50%] px-6 md:px-10 xl:px-[70px]  lg:float-left pb-8 bg-white rounded-2xl py-8">
            <h2 className="text-4xl sm:text-5xl font-semibold text-brand-darkcyan text-center lg:text-start">
              {profile?.first_name || "No Name"}
              {profile?.isVerified && (
                <CheckCircle className="text-green-500 ml-2 inline" size={48} />
              )}
            </h2>

            <div className="flex flex-col items-center justify-center lg:items-start">
              <span className="bg-brand-cyan text-white rounded-lg px-2 py-1 my-1 text-[12px]">
                {profile?.visitors.length} Viewers
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 my-6 gap-2">
              <div className="border border-brand-oppla rounded-lg p-3  flex flex-col items-center justify-center gap-4">
                <Image
                  src={"/images/city.png"}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-full max-w-[75px] h-[75px] object-cover"
                />
                <span className="flex flex-col items-center">
                  <span className="text-base uppercase"> city:</span>
                  <span className="text-[18px] font-bold text-brand-cyan">
                    {profile?.city}
                  </span>
                </span>
              </div>
              <div className="border border-brand-oppla rounded-lg p-3  flex flex-col items-center justify-center gap-4">
                <Image
                  src={"/images/age.png"}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-full max-w-[75px] h-[75px] object-cover"
                />
                <span className="flex flex-col items-center">
                  <span className="text-base uppercase">Age:</span>{" "}
                  <span className="text-[18px] font-bold text-brand-cyan">
                    {profile?.date_of_birth
                      ? calculateAge(profile.date_of_birth)
                      : "N/A"}
                  </span>
                </span>
              </div>
              <div className="border border-brand-oppla rounded-lg p-3  flex flex-col items-center justify-center gap-4">
                <Image
                  src={"/images/height.png"}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-full max-w-[75px] h-[75px] object-cover"
                />
                <span className="flex flex-col items-center">
                  <span className="text-base uppercase"> Height:</span>{" "}
                  <span className="text-[18px] font-bold text-brand-cyan">
                    {" "}
                    {profile?.height}
                  </span>
                </span>
              </div>
              <div className="border border-brand-oppla rounded-lg p-3  flex flex-col items-center justify-center gap-4">
                <Image
                  src={"/images/job.png"}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-full max-w-[75px] h-[75px] object-cover"
                />
                <span className="flex flex-col items-center">
                  <span className="text-base uppercase"> job:</span>{" "}
                  <span className="text-[18px] font-bold text-brand-cyan">
                    {profile?.occupation}
                  </span>
                </span>
              </div>
            </div>
            <div className="border-b-[1px] border-brand-oppla pb-8 mb-8">
              <span className="font-semibold text-[18px] text-brand-darkGreen">
                About:
              </span>
              <span className="block py-3  text-base text-black">
                {profile?.about_candidate}
              </span>
            </div>
            <div className="border-b-[1px] border-brand-oppla pb-8 mb-8">
              <span className="font-semibold text-[18px] text-brand-darkGreen mb-6 block">
                Photo Gallery
              </span>
              <Image
                alt="Full Pic"
                src={profile?.full_pic}
                width={100}
                height={100}
                className="w-full max-w-[200px] h-[200px] rounded-lg"
              />
            </div>

            <div className="border-b-[1px] border-brand-oppla pb-8 mb-8">
              <span className="font-semibold text-[18px] text-brand-darkGreen mb-6 block">
                Contact Information
              </span>
              <div className="text-base text-brand-darkGreen mb-3 flex items-center gap-4">
                <div className="border-[2px] border-brand-oppla rounded-xl w-[50px] h-[50px] flex items-center justify-center ">
                  <PhoneIcon className="w-[35px] h-[35px]" />
                </div>
                <div>
                  <span className=" font-semibold ">Phone:</span>{" "}
                  <span className="">{profile?.contact_no}</span>
                </div>
              </div>
              <div className="text-base text-brand-darkGreen  flex items-center gap-4">
                <div className="border-[2px] border-brand-oppla rounded-xl w-[50px] h-[50px] flex items-center justify-center ">
                  <EmailIcon className="w-[35px] h-[35px]" />
                </div>
                <div>
                  <span className=" font-semibold">Email:</span>{" "}
                  <span>{profile?.email}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="font-semibold text-[18px] text-brand-darkGreen mb-6 block">
                Personal Information
              </span>
              <div className="flex em:flex-row flex-col gap-8 justify-between">
                <div className="flex-col flex gap-y-4">
                  <div>
                    <span className="text-base font-semibold text-black">
                      Name:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.first_name}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-semibold text-black">
                      Date of Birth:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.date_of_birth}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-semibold text-black">
                      Weight:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {" "}
                      {profile?.weight}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-semibold text-black">
                      Religion:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.religion}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-semibold text-black">
                      Salary (per annum):{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.annual_income}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-semibold text-black">
                      Blood Group:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.blood_group}
                    </span>
                  </div>

                  <div>
                    <span className="text-base font-semibold text-black">
                      Community:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.community}
                    </span>
                  </div>
                </div>
                <div className="flex-col flex gap-y-4">
                  <div>
                    <span className="text-base font-semibold text-black">
                      Degree:
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {" "}
                      {profile?.education}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-black">
                      Father Name:
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {" "}
                      {profile?.father_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-black">
                      Mother Name:
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.mother_name}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-black">
                      Health Information:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.health_information}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-black">
                      Marital Status:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.marital_status}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-black">
                      Mother Tongue:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.mother_tongue}
                    </span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-black">
                      Diet:{" "}
                    </span>
                    <span className="text-base font-normal text-brand-darkGreen">
                      {profile?.diet_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-8"
              onClick={() => handleSentRequest(profile.id)}
            >
              Sent Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
