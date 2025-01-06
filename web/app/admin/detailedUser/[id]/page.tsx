"use client";
import { ProfileTableProps } from "@/lib/sanity/types";
import useSupabase from "@/utils/hooks/useSupabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Dummy from "@/public/images/download.jpg";
import { useParams } from "next/navigation";

const ProfileDetail = () => {
  const { id } = useParams();

  const supabase = useSupabase();
  const [profileData, setProfile] = useState<ProfileTableProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);

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
            const completedSteps = data?.completed_steps || [];
            const totalSteps = 12;
            const percentage = Math.round((completedSteps / totalSteps) * 100);
            setCompletionPercentage(percentage);
          }
        } catch (err) {
          console.error("Error during profile fetch:", err);
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [id, supabase]);

  const verifyUser = async () => {
    if (supabase && id) {
      setLoading(true); // Set loading state to true while waiting for the update

      try {
        const { data, error } = await supabase
          .from("profiles")
          .update({ isVerified: true })
          .eq("id", id);

        if (error) {
          console.error("Error verifying user:", error);
          setLoading(false);
        } else {
          toast.success("User verified successfully");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error during profile verification:", err);
        setLoading(false);
      }
    }
  };

  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (completionPercentage / 100) * circumference;

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
    <div className="bg-white rounded-lg shadow-lg  p-4 sm:p-8   border border-gray-200">
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
              {profileData?.first_name || ""}
            </h2>
            <p className="text-brand-lightBlack text-base">YM34111357</p>
            <p className="text-sm text-gray-400">Account Type</p>
            <p className="text-sm font-medium text-brand-cyan">
              Free Membership
            </p>
          </div>
        </div>
        <div className="flex items-center w-full max-w-[300px]">
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
          </div>
        </div>
      </div>


      <div className="bg-white rounded-lg shadow-lg  p-4 sm:p-8   border border-gray-200">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
        <h2 className="text-2xl font-semibold text-teal-600">
          Personal Details
        </h2>
      </div>
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Personality, Family Details, Career, Partner Expectations etc.
          </h3>
          <p className="text-gray-600">{profileData?.about_candidate}</p>
        </section>
        <hr className="border-gray-300" />
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Details
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Age:</span>{" "}
                {profileData?.date_of_birth
                  ? calculateAge(profileData.date_of_birth)
                  : "N/A"}
              </li>
              <li>
                <span className="font-medium">Date of Birth:</span>{" "}
                {profileData?.date_of_birth}
              </li>
              <li>
                <span className="font-medium">Marital Status:</span>{" "}
                {profileData?.marital_status}
              </li>
              <li>
                <span className="font-medium">Height:</span>{" "}
                {profileData?.height} cm
              </li>
              <li>
                <span className="font-medium">Grew Up In:</span>{" "}
                {profileData?.grew_up_in}
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Life Style
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Diet Type:</span>{" "}
                {profileData?.diet_type}
              </li>
              <li>
                <span className="font-medium">Blood Group:</span>{" "}
                {profileData?.blood_group}
              </li>
              <li>
                <span className="font-medium">Health Information:</span>{" "}
                {profileData?.health_information}
              </li>
              <li>
                <span className="font-medium">Disability:</span>{" "}
                {profileData?.describe_disability}
              </li>
            </ul>
          </section>
        </div>
        <hr className="border-gray-300" />
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Religious Background
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Religious:</span>{" "}
                {profileData?.religion}
              </li>
              <li>
                <span className="font-medium">Community:</span>{" "}
                {profileData?.community}
              </li>
              <li>
                <span className="font-medium">Sub Community:</span>{" "}
                {profileData?.sub_community}
              </li>
              <li>
                <span className="font-medium">Gothra:</span>{" "}
                {profileData?.gothra}
              </li>
              <li>
                <span className="font-medium">Mother Tongue:</span>{" "}
                {profileData?.mother_tongue}
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Astro Details
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Mangalik:</span>{" "}
                {profileData?.mangalik ? "Yes" : "No"}
              </li>
              <li>
                <span className="font-medium">Date of Birth:</span>{" "}
                {profileData?.date_of_birth}
              </li>
              <li>
                <span className="font-medium">Time of Birth:</span>{" "}
                {profileData?.birth_time}
              </li>
              <li>
                <span className="font-medium">City of Birth:</span>{" "}
                {profileData?.birth_place}
              </li>
            </ul>
          </section>
        </div>

        <hr className="border-gray-300" />
        <div className="">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Family Details
            </h3>
            <ul className="grid grid-cols-1 em:grid-cols-2 gap-3 text-gray-600">
              <li>
                <span className="font-medium">Mother Name:</span>{" "}
                {profileData?.mother_name}
              </li>
              <li>
                <span className="font-medium">Father Name:</span>{" "}
                {profileData?.father_name}
              </li>
              <li>
                <span className="font-medium">Current Address:</span>{" "}
                {profileData?.address_detail}
              </li>
              <li>
                <span className="font-medium">No of Sisters:</span>{" "}
                {profileData?.Unmarried_sisters}
                {profileData?.married_sister}
              </li>
              <li>
                <span className="font-medium">No of Brothers:</span>{" "}
                {profileData?.Unmarried_brothers}
                {profileData?.married_brothers}
              </li>
            </ul>
          </section>
        </div>

        <hr className="border-gray-300" />
        <div className="">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Education & Career
            </h3>
            <ul className="grid grid-cols-1 em:grid-cols-2 gap-3 text-gray-600">
              <li>
                <span className="font-medium">Highest Qualification:</span>{" "}
                {profileData?.education}
              </li>
              <li>
                <span className="font-medium">College Name:</span>{" "}
                {profileData?.collage_location}
              </li>
              <li>
                <span className="font-medium">Annual Income:</span>{" "}
                {profileData?.annual_income}
              </li>
              <li>
                <span className="font-medium">Working With:</span>{" "}
                {profileData?.working_with}
              </li>
              <li>
                <span className="font-medium">Working As:</span>{" "}
                {profileData?.occupation}
              </li>
            </ul>
          </section>

        </div>

        <hr className="border-gray-300" />
        <div className=" gap-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Current Location
            </h3>
            <ul className="grid grid-cols-1 em:grid-cols-2 gap-y-3 text-gray-600">
              <li>
                <span className="font-medium">Current Residence:</span>{" "}
                {profileData?.city}
              </li>
              <li>
                <span className="font-medium">State of Residence:</span>{" "}
                {profileData?.state}
              </li>
              <li>
                <span className="font-medium">Residency Status:</span>{" "}
                {profileData?.address_detail}
              </li>
              <li>
                <span className="font-medium">ZIP / PIN code:</span>{" "}
                {profileData?.zip_code}
              </li>
            </ul>
          </section>
        </div>

        <hr className="border-gray-300" />
        <div className="">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Hobbies and Interest
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                {profileData?.hobby_interest &&
                  profileData?.hobby_interest.map((hobby, index) => {
                    return (
                      <span
                        className="p-2 rounded-2xl border-gray-300 border mx-2"
                        key={index}
                      >
                        {hobby}
                      </span>
                    );
                  })}
              </li>
            </ul>
          </section>
        </div>

        <hr className="border-gray-300" />
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-semibold text-teal-600">
            Partner Preference
          </h2>
        </div>

        <div className="">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Requirements
            </h3>
            <ul className="grid grid-cols-1 em:grid-cols-2 gap-y-3 text-gray-600">
              <li>
                <span className="font-medium">Birth year:</span>
                {
                  profileData?.partner_max_birth_year
                } to {profileData?.partner_min_birth_year}
              </li>
              <li>
                <span className="font-medium">Height:</span>{" "}
                {profileData?.partner_min_height} to{" "}
                {profileData?.partner_max_height}
              </li>
              <li>
                <span className="font-medium">Weight:</span>{" "}
                {profileData?.partner_min_weight} to{" "}
                {profileData?.partner_max_weight}
              </li>
              <li>
                <span className="font-medium">Marital Status:</span>{" "}
                {profileData?.partner_marital_status}
              </li>
              <li>
                <span className="font-medium">Smoking:</span>{" "}
                {profileData?.partner_smoking}
              </li>
              <li>
                <span className="font-medium">Drinking:</span>{" "}
                {profileData?.partner_alcohol}
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
 <div className="flex items-center justify-center">
 <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-8"
          onClick={verifyUser}
        >
          Verify
        </button>
 </div>
    </div>
  );
};

export default ProfileDetail;
