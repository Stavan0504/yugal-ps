"use client";
import { HeroSection, HomeHeroSectionType } from "@/lib/sanity/types";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

interface HomeHeroSectionProps {
  data: HomeHeroSectionType;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ data }) => {
  const { headline, description, button1, button2, backgroundImage } = data;
  const [Loading, setLoading] = useState(false);
  const [LoadingBtn2, setLoadingBtn2] = useState(false);

  const handleroute = () => {
    setLoading(true);
  };
  const handlerouteTwo = () => {
    setLoadingBtn2(true);
  };

  return (
    <>
      <div className="relative z-10  pt-[100px] sm:pt-[140px] md:pt-[164px] pb-[87px] mt-[75px]">
        <Image
          priority
          src={backgroundImage.src as string}
          alt={backgroundImage.altText as string}
          width={1920}
          height={613}
          className="absolute inset-0 w-full h-full -z-10 object-cover"
        />
        <div className="container">
          <div className="w-full max-w-[712px]">
            {headline && (
              <h1 className="text-[58px] md:text-[72px] lg:text-[95px] font-bold leading-[105%] text-brand-cyan">
                {headline}
              </h1>
            )}
            <p className="text-[20px] md:text-[25px] text-white leading-[140%] w-full max-w-[380px] mt-2">
              {description}
            </p>
            <div className="flex flex-col items-start mt-[47px]">
              <Link href="/sign-in">
                <button
                  className="bg-buttonGradient shadow-buttonShadow rounded-[10px] text-xl md:text-2xl font-bold text-white py-2 px-[58px] transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={handleroute}
                >
                  {Loading ? "Loading.." : button1.label}
                </button>
              </Link>
              <Link href="/sign-up">
                <button
                  className="bg-buttonGradient shadow-buttonShadow rounded-[10px] text-xl md:text-2xl font-bold text-white py-2 px-[17px] mt-[37px] transition-transform duration-300 ease-in-out hover:scale-105"
                  onClick={handlerouteTwo}
                >
                  {LoadingBtn2 ? "Loading.." : button2.label}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeroSection;
