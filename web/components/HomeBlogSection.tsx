import { BlogsectionTypes } from "@/lib/sanity/types";
import Image from "next/image";
import React from "react";

interface HomeBlogSectionProps {
  contentItem: BlogsectionTypes;
}

const HomeBlogSection: React.FC<HomeBlogSectionProps> = ({ contentItem }) => {
  const { title, asset, blogs } = contentItem;
  return (
    <div className="bg-[#F6FDFF] pt-[50px] md:pt-[81px] pb-[80px] md:pb-[114px]">
      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[30px] md:text-[36px] lg:text-[50px] text-black mb-2 capitalize">
            {title}
          </h2>
          <Image
            src={asset?.src || ""}
            alt={asset?.altText || "user Image"}
            width={128}
            height={128}
            className="w-full max-w-[160px] h-[25px] object-cover"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[50px] md:mt-[87px] gap-12">
          {blogs?.map((blog, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start "
              >
                <Image
                  src={blog.image.src}
                  alt={blog.image.altText || "user Image"}
                  width={350}
                  height={350}
                  className="w-full lg:max-w-[300px] h-[300px] object-cover rounded-[25px]"
                />
                <div className="mt-[29px] w-full lg:max-w-[300px]">
                  <span className="text-xl text-[#01858B]">{blog.tag}</span>
                  <h3 className="text-[25px]  text-black my-2">{blog.title}</h3>
                  <p className="text-[18px] text-black font-light ">{blog.description}</p>
                  <button className="px-[26px] py-2 bg-[#01858B] text-white text-[20px] font-bold rounded-full hover:bg-transparent  border-[1px] border-transparent hover:border-[#01858B] BasicTransition hover:text-[#01858B] mt-[17px]">
                    {blog.button}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogSection;
