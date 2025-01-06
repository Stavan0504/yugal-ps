import { WhyChoosesection } from "@/lib/sanity/types";
import Image from "next/image";
import React from "react";

interface HomeWhyChooseUsProps {
  contentItem: WhyChoosesection;
}

const HomeWhyChooseUs: React.FC<HomeWhyChooseUsProps> = ({ contentItem }) => {
  const { bgImage, features, subtitle, title, asset, whyText } = contentItem;

  return (
    <>
      <div className=" relative pb-16 bg-brand-stone">
        <div className="container">
          <div className="w-full max-w-[280px] em:max-w-[428px] absolute top-[-122px] em:top-[-188px] left-[50%] translate-x-[-50%]">
            <Image
              src={bgImage.src}
              alt={bgImage.altText || ""}
              layout="fill"
              objectFit="cover"
              className=" !relative w-full  !h-[190px] em:!h-[295px] object-cover "
            />
          </div>
          <div className="relative z-10 text-center pt-[143px]">

            <p className="text-[25px] text-white ">{whyText}</p>
            <h2 className="text-[30px] md:text-[36px] lg:text-[50px] text-white leading-[100%] mb-3 mt-1">{title}</h2>
            <div className="relative w-32 mx-auto mb-8">
              <Image
                src={asset?.src}
                alt={asset?.altText || ""}
                width={asset?.width}
                height={asset?.height}
                objectFit="contain"
                className="w-full max-w-[160px] h-[25px] object-cover"
              />
            </div>
            <p className="text-[25px] text-white mt-[22px] font-light mb-[46px]">{subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mb-[-190px] lg:mb-[-250px]">
              {features?.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white text-black rounded-lg p-5 shadow-customerReviewSahdow transition"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={feature?.icon?.src}
                      alt={feature?.icon?.altText || "Feature Icon"}
                      width={feature?.icon?.width}
                      height={feature?.icon?.height}
                      objectFit="contain"
                      className="w-full max-w-[60px] xl:max-w-[80px] h-[60px] xl:h-[80px] object-cover"
                    />
                  </div>
                  <h3 className=" text-[24px] xl:text-[30px] leading-[115%] font-semibold text-black text-center mb-[22px]">
                    {feature?.title}
                  </h3>
                  <p className="text-[18px] xl:text-[22px] font-light text-balack text-center leading-[130%]">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeWhyChooseUs;
