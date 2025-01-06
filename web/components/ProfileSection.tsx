import { ProfileTableProps } from "@/lib/sanity/types";
import React from "react";

const ProfileSection = ({
  profileData,
}: {
  profileData: ProfileTableProps | null;
}) => {
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
  );
};

export default ProfileSection;
