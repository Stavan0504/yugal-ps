import { HomeContactUsSection } from "@/lib/sanity/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface HomeContactSectionProps {
  contentItem: HomeContactUsSection;
}

const HomeContactSection: React.FC<HomeContactSectionProps> = ({
  contentItem,
}) => {
  const { title, subtitle, images, description, contactDetails, asset } =
    contentItem;

  return (
    <div className="bg-[#F6FDFF] relative  pt-[250px] lg:pt-[380px] pb-[60px] sm:pb-[120px] lg:pb-[250px]">
      <div className="w-full flex lg:flex-row flex-col gap-24 gap-y-56 items-center justify-between container">
        <div className="relative w-full max-w-[425px] lg:max-w-[537px] mx-auto">
          <div className="w-full max-w-[70px] sm:max-w-[98px] h-[70px] sm:h-[98px] border-[8px] border-[#FFD727] rounded-full absolute left-[-30px] sm:left-[-50px] top-[-40px] sm:top-[-50px] z-10"></div>
          {images?.map((image, index) => (
            <div key={index} className="">
              <Image
                src={image?.icon?.src}
                alt={image?.icon?.altText || "Image"}
                width={300}
                height={300}
                className={clsx(
                  "rounded-lg w-full object-cover",
                  index === 0 ? "max-w-[422px] h-[422px] z-20 relative" : "",
                  index === 1
                    ? "absolute bottom-[-150px] right-0 sm:right-auto sm:ml-[60px] max-w-[381px] h-[240px] sm:h-[254px] z-20"
                    : ""
                )}
              />
            </div>
          ))}
          <div className="w-full max-w-[130px] sm:max-w-[165px] h-[120px] sm:h-[159px] border-[8px] border-[#FFCCCC] rounded-[25px] absolute right-[-20px] sm:right-auto sm:ml-[320px] bottom-[-190px]"></div>
        </div>

        <div className="w-full max-w-full lg:max-w-[550px]">
          <span className="text-brand-darkcyan uppercase text-[25px]">
            {title}
          </span>
          <h2 className="text-[30px] md:text-[36px] lg:text-[50px] text-black font-bold">
            {subtitle}
          </h2>
          <div className="w-full max-w-full lg:max-w-[430px] mx-auto">
            <div className="my-4">
              <Image
                src={asset?.src as string}
                alt={asset?.altText || "Image"}
                width={300}
                height={300}
                className="w-full max-w-[160px] h-[25px] object-cover "
              />
            </div>
            <p className="text-[20px] text-brand-darkcyan w-full max-w-full lg:max-w-[366px] mx-auto">
              {description}
            </p>
            <div className="mt-[35px] sm:mt-[58px] flex flex-col gap-y-8">
              {contactDetails?.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-gray-700"
                >
                  <div className="items-center justify-center rounded-full">
                    <Image
                      src={detail?.icon?.src}
                      alt={detail?.icon?.altText || "Icon"}
                      width={64}
                      height={64}
                      className="w-full  min-e-[45px] sm:min-w-[56px] h-[45px] sm:h-[56px] object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[16px] esm:text-[18px] sm:text-[20px] text-black">
                      {detail?.title}
                    </p>
                    <p className="text-[18] esm:text-[22px] sm:text-[24px] md:text-[28px] font-semibold text-black">
                      {detail.link ? (
                        <a
                          href={`${detail.link}:${detail.value}`}
                          className="text-brand-cyan hover:opacity-80"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        detail.value
                      )}
                    </p>
                  </div>

                  {/* <p className="text-[18px] text-black leading-[110%] w-full max-w-full md:max-w-[300px]">
                        {item.link ? (
                          <a
                            href={`${item.link}:${item.value}`}
                            className="text-brand-cyan hover:opacity-80"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContactSection;
