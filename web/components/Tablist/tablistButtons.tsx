import React, { useEffect, useState } from "react";
import { ScrumData } from "./index";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { useTablistStore } from "@/store/tablistStore";
import PreviousToggleIcon from "../commons/icons/previousToggleIcon/indx";
import NextToggleIcon from "../commons/icons/nextToggleIcon/indx";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";

const TablistButtons = ({ isvalidate }: { isvalidate: boolean }) => {
  const { submitForm } = useFormikContext();
  const router = useRouter();
  const supabase = useSupabase();
  const [userId, setUserId] = useState<string | null>(null);
  const { currentIndex, breadcrumbItems, setBreadcrumbItems, setCurrentIndex } =
    useTablistStore();
  const { user, loading, error } = useUser();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setBreadcrumbItems(ScrumData[currentIndex - 1].name);
    }
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    await submitForm();
    if (isvalidate) {
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        if (user?.id) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("completed_steps")
            .eq("id", userId)
            .single();

          if (profileError) {
            console.error("Error fetching completed_steps:", profileError);
          } else {
            const currentSteps = Number(profileData?.completed_steps) || 1;

            let newSteps = currentSteps + 1;
            if (newSteps > 11) {
              newSteps = 12;
            }

            const { error: updateError } = await supabase
              .from("profiles")
              .update({ completed_steps: newSteps })
              .eq("id", userId);

            if (updateError) {
              console.error("Error updating completed_steps:", updateError);
            } else {
              if (currentIndex < ScrumData.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setBreadcrumbItems(ScrumData[currentIndex + 1].name);
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="mt-4 flex justify-center gap-2 sm:static sticky bottom-0 left-0 bg-brand-blue50 py-4 sm:py-0 w-full">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`px-4 border flex items-center gap-2.5 border-[#E2E8F0] py-2 rounded disabled:cursor-not-allowed disabled:opacity-40 ${
          currentIndex === 0
            ? "bg-white text-black"
            : "bg-brand-darkcyan text-white"
        }`}
      >
        <PreviousToggleIcon
          color={`${currentIndex === 0 ? "black" : "white"}`}
        />
        Previous
      </button>
      <button
        onClick={handleNext}
        type="submit"
        className={`px-7 border flex items-center gap-2.5 border-[#E2E8F0] py-2 rounded disabled:cursor-not-allowed disabled:opacity-40 bg-white text-black`}
      >
        Next
        <NextToggleIcon
          color={`${currentIndex === ScrumData?.length - 1 ? "white" : "black"}`}
        />
      </button>
    </div>
  );
};

export default TablistButtons;
