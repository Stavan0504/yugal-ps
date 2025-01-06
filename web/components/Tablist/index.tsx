"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContactDetail from "../forms/contact";
import AboutYouForm from "../forms/about";
import ReligiousForm from "../forms/religious";
import AstroForm from "../forms/astro";
import AcademicForm from "../forms/academic";
import CareerForm from "../forms/career";
import LocationForm from "../forms/locations";
import FamilyForm from "../forms/family";
import LifeStyleForm from "../forms/lifeStyle";
import PartnerPreferencesForm from "../forms/partnerPreferences";
import AboutFormSecond from "../forms/about/aboutFormSecond";
import clsx from "clsx";
import { useTablistStore } from "@/store/tablistStore";
import useUser from "@/utils/hooks/useUser";
import useSupabase from "@/utils/hooks/useSupabase";
import { useRouter } from "next/navigation";

export const ScrumData = [
  {
    name: "Contact Form",
    label: "Contact Detail",
    component: <ContactDetail />,
    step: 1,
  },
  {
    name: "About Form",
    label: "About You",
    component: <AboutYouForm />,
    step: 2,
  },
  {
    name: "About Form Second",
    label: "About You",
    component: <AboutFormSecond />,
    step: 3,
  },
  {
    name: "Religious Form",
    label: "Religious",
    component: <ReligiousForm />,
    step: 4,
  },
  {
    name: "Astro Form",
    label: "Astro",
    component: <AstroForm />,
    step: 5,
  },
  {
    name: "Academic Form",
    label: "Academic",
    component: <AcademicForm />,
    step: 6,
  },
  {
    name: "Career Form",
    label: "Career",
    component: <CareerForm />,
    step: 7,
  },
  {
    name: "Location Form",
    label: "Location",
    component: <LocationForm />,
    step: 8,
  },
  {
    name: "Family Form",
    label: "Family",
    component: <FamilyForm />,
    step: 9,
  },
  {
    name: "Life Style Form",
    label: "Life Style",
    component: <LifeStyleForm />,
    step: 10,
  },
  {
    name: "Parter Preferences Form",
    label: "Parter Preferences",
    component: <PartnerPreferencesForm />,
    step: 11,
  },
];
const OnBoardingTablist: React.FC = () => {
  const { breadcrumbItems, currentIndex, setBreadcrumbItems, setCurrentIndex } =
    useTablistStore();
  const { user, loading, error } = useUser();
  const [completedSteps, setCompletedSteps] = useState<number | null>(null);

  const supabase = useSupabase();
  const renderedLabels = new Set();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("completed_steps")
          .eq("id", user?.id)
          .single();

        if (error) {
          console.log("Error fetching  data:", error);
        } else {
          setCompletedSteps(data?.completed_steps ?? 1);
          if (data?.completed_steps === 12) {
            router.push("/profile");
          }

          if (
            data?.completed_steps > 0 &&
            data?.completed_steps <= ScrumData.length
          ) {
            setCurrentIndex(data?.completed_steps - 1);
          }
        }
      }
    };

    fetchData();
  }, [user, supabase]);

  // useEffect(() => {
  //   if (completedSteps !== null) {
  //     if (completedSteps > ScrumData.length) {
  //       console.log("cross");
  //       router.push("/profile");
  //     }

  //     if (completedSteps > 0 && completedSteps <= ScrumData.length) {
  //       setCurrentIndex(completedSteps - 1);
  //     }
  //   }
  // }, [completedSteps, setCurrentIndex]);

  const currentItem = ScrumData[currentIndex];
  const componentToRender = currentItem ? currentItem.component : null;

  // useEffect(() => {
  //   if (completedSteps !== null && completedSteps === ScrumData.length) {
  //     setCurrentIndex(12);
  //   }
  // }, [completedSteps]);

  // const componentToRendername = currentItem ? currentItem.label : null;

  return (
    <div className="mt-10">
      {currentIndex !== 12 ? componentToRender : null}
    </div>
  );
};

export default OnBoardingTablist;
