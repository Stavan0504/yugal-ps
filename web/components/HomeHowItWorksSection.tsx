import { HowItWorksSection } from "@/lib/sanity/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface HomeHowItWorksSectionProps {
  contentItem: HowItWorksSection;
}

const HomeHowItWorksSection: React.FC<HomeHowItWorksSectionProps> = ({
  contentItem,
}) => {
  const { title, steps } = contentItem;

  return (
    <div className="pt-[50px] md:pt-[80px] lg:pt-[104px]">
      <div className=" flex flex-col items-center container">
        <h2 className="text-[36px] md:text-[42px] lg:text-[50px] text-black text-center mb-[20px] md:mb-[40px] lg:mb-[50px]">
          {title}
        </h2>

        <div className="w-full max-w-[745px]">
          {steps?.map((step, index) => {
            const isLeft = step.imageleftRight === "left";

            return (
              <div
                key={index}
                className={`flex relative flex-col ${
                  isLeft ? " sm:flex-row-reverse" : "sm:flex-row"
                }`}
              >
                <div
                  className={clsx(
                    "w-full max-w-full sm:max-w-[372px] h-full py-8",
                    isLeft ? "sm:pl-8 lg:pl-[57px]" : " sm:pr-8 lg:pr-[57px]"
                  )}
                >
                  <h3 className="text-[24px] lg:text-[30px] text-brand-darkcyan font-semibold mb-[11px]">
                    {step?.title}
                  </h3>
                  <Image
                    src={step?.icon?.src}
                    alt={step?.icon?.altText || "user Image"}
                    width={128}
                    height={128}
                    className="w-full max-w-[119px] h-[19px] object-cover"
                  />
                  <p className="text-black text-lg mt-[17px]">
                    {step?.description}
                  </p>
                </div>
                <div
                  className={clsx(
                    "border-[#00ADB5]/[16%] py-8 relative w-full ",
                    isLeft
                      ? "sm:border-r-[1px] sm:pr-8 lg:pr-[57px]"
                      : "sm:border-l-[1px] sm:pl-8 lg:pl-[57px]"
                  )}
                >
                  <div
                    className={clsx(
                      "sm:block hidden absolute top-0 border-[4px] border-brand-darkcyan bg-brand-cyan w-[29px] h-[29px] rounded-full",
                      isLeft ? "right-[-15px]" : "left-[-15px] "
                    )}
                  ></div>
                  <Image
                    src={step?.mainImage?.src}
                    alt={step?.mainImage?.altText || "Step Image"}
                    width={step?.mainImage?.width || 500}
                    height={step?.mainImage?.height || 300}
                    className="w-full max-w-full lg:max-w-[200px] h-[200px] object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeHowItWorksSection;
