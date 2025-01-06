import React, { useEffect, useState } from 'react'
import PreviousToggleIcon from '../commons/icons/previousToggleIcon/indx'
import { FormikHelpers, useFormikContext } from 'formik';
import useSupabase from '@/utils/hooks/useSupabase';
import useUser from '@/utils/hooks/useUser';
import { useTablistStore } from '@/store/tablistStore';
import { ScrumData } from "./index";
import NextToggleIcon from '../commons/icons/nextToggleIcon/indx';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
interface Props {
    children: React.ReactNode
    isvalidate: boolean;
    validateForm: FormikHelpers<any>["validateForm"]
    values: any
}
const TablistWrapper: React.FC<Props> = ({
    children, isvalidate, validateForm, values
}) => {
    const { submitForm } = useFormikContext();
    const router = useRouter();
    const supabase = useSupabase();
    const [userId, setUserId] = useState<string | null>(null);
    const { currentIndex, breadcrumbItems, setBreadcrumbItems, setCurrentIndex } =
        useTablistStore();
    const { user, loading, error } = useUser();

    useEffect(() => {
        if (user) {
            setUserId(user.id)
        }
    }, [user])

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
                            newSteps = 1;
                        }

                        const { error: updateError } = await supabase
                            .from("profiles")
                            .update({ completed_steps: newSteps })
                            .eq("id", userId);

                        if (updateError) {
                            console.error("Error updating completed_steps:", updateError);
                        } else {
                            // Move to the next step in the sequence
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

    const ProgressSteps = async (Transferstep: number) => {
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

                        const { error: updateError } = await supabase
                            .from("profiles")
                            .update({ completed_steps: Transferstep })
                            .eq("id", userId);

                        if (updateError) {
                            console.error("Error updating completed_steps:", updateError);
                        } else {
                            const nextIndex = ScrumData.findIndex(item => item.step === Transferstep);
                            if (nextIndex >= 0 && nextIndex < ScrumData.length) {
                                setCurrentIndex(nextIndex);
                                setBreadcrumbItems(ScrumData[nextIndex].name);
                            }
                        }
                    }
                }
            }
        }
    }

    const renderedLabels = new Set();
    return (
        <div className='w-full'>
            <div className="flex whitespace-nowrap scrollbarHide  overflow-x-auto items-center  border-b-[1px] border-[#CBD5E1] w-full mb-5 sticky top-[78px] bg-[#FFFFFF]">
                <div className="container flex justify-between gap-8 w-full">
                    {ScrumData?.map((item, index) => {
                        if (renderedLabels.has(item.label)) {
                            return null;
                        }
                        renderedLabels.add(item.label);
                        return (
                            <React.Fragment key={index}>
                                <span
                                    onClick={async (e) => {
                                        await submitForm();
                                        if (isvalidate) {
                                            setCurrentIndex(index);
                                            setBreadcrumbItems(item.name);
                                            ProgressSteps(item.step)
                                        }

                                    }}
                                    // className="cursor-pointer hover:underline"
                                    className={clsx(
                                        " py-4  cursor-pointer text-base",
                                        currentIndex === index
                                            ? "text-brand-cyan border-b-[1px] border-brand-cyan"
                                            : "text-brand-darkcyan"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            {children}
            <div className='container'>

                <div className=" px-4 em:px-10 lg:px-[64px] flex justify-center gap-2 sm:static sticky bottom-0 left-0 bg-brand-blue50  w-full mb-8  rounded-b-lg pb-8">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className={`px-4 border flex items-center gap-2.5 border-[#E2E8F0] py-2 rounded disabled:cursor-not-allowed disabled:opacity-40 ${currentIndex === 0
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
            </div>
        </div>
    )
}

export default TablistWrapper
