"use client";
import React, { useEffect, useState } from "react";
import useSupabase from "@/utils/hooks/useSupabase";

interface ProfileDetailProps {
  id: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ id }) => {
  const supabase = useSupabase();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, supabase]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
      hgisdhf
      {/* <h1 className="text-2xl font-semibold text-teal-600">
        {profile.first_name}
      </h1>
      <img
        src={profile.full_pic}
        alt={`${profile.first_name}'s profile`}
        className="rounded-lg mt-4"
      /> */}
    </div>
  );
};

export default ProfileDetail;
