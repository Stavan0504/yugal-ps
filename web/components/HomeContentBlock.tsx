"use client";
import { HomeContentBlockType } from "@/lib/sanity/types";
import Image from "next/image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import clsx from "clsx";
import RightArrowIcon from "./commons/icons/rightArrowIcon";
import LeftArrowIcon from "./commons/icons/leftArrowIcon";

interface HomeContentBlockProps {
  data: HomeContentBlockType;
}

const HomeContentBlock: React.FC<HomeContentBlockProps> = ({ data }) => {
  const { contents = [] } = data || {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<SwiperRef | null>(null);

  const goToSlide = (index: number): void => {
    if (swiperRef?.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
      setSelectedIndex(index);
    }
  };

  const handleSlideChange = (swiper: any) => {
    const currentIndex = swiper.realIndex;
    setSelectedIndex(currentIndex);
    setActiveIndex(currentIndex);
  };

  const paginationButtons = contents.map((_, i) => (
    <button
      key={i}
      onClick={() => goToSlide(i)}
      aria-label={`Slide ${i + 1}`}
      className={clsx(
        "pagination-bullet flex items-center gap-1.5",
        selectedIndex === i ? "active" : ""
      )}
    >
      <div
        className={clsx(
          "w-[18px] h-[18px] rounded-full",
          selectedIndex === i ? "bg-brand-cyan" : "bg-gray-300"
        )}
      ></div>
    </button>
  ));

  return (
    <div className="bg-brand-stone relative pt-[80px] md:pt-[130px] lg:pt-[183px] pb-[70px] md:pb-[120px] lg:pb-[163px]">
      <div className="container ">
        <div className="relative pb-48">
          {/* Content displayed over the slides */}
          {contents.map((content, index) => {
            const { image, title, description } = content || {};
            const isActive = index === activeIndex;

            return (
              <div key={index} className="absolute inset-0">
                <div
                  className={clsx(
                    "w-full flex flex-col items-center gap-[22px] mt-4",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  {title && (
                    <h2 className="text-[30px] md:text-[36px] lg:text-[50px] text-brand-cyan text-center leading-[100%]">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-[18px] md:text-[22px] lg:text-[25px] text-white text-center font-light leading-[120%] w-full max-w-[582px]">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <Swiper
            slidesPerView={1.1}
            spaceBetween={12}
            centeredSlides={true}
            loop={true}
            onSlideChange={handleSlideChange}
            ref={swiperRef}
            className="relative"
            breakpoints={{
              480: {
                slidesPerView: 1.8,
                spaceBetween: 32,
              },
              768: {
                slidesPerView: 2.1,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 32,
              },
            }}
          >
            {contents.map((content, index) => {
              const { image } = content || {};
              const imageToDisplay = image?.src;

              return (
                <SwiperSlide key={index} className="flex flex-col items-center">
                  {imageToDisplay && (
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={imageToDisplay}
                        alt={image?.altText || "Content image"}
                        width={600}
                        height={400}
                        className="w-full h-[275px] object-cover"
                      />
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-1.5 mt-8">
          {paginationButtons}
        </div>

        {/* Arrow navigation */}
        <div className="flex items-center justify-between w-full max-w-[200px] lg:max-w-[1400px] mx-auto mt-6 gap-8 lg:absolute top-[55%]  left-0 right-0 z-20">
          {/* Previous button */}
          <button
            aria-label="Previous slide arrow"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className=""
          >
            <LeftArrowIcon />
          </button>

          {/* Next button */}
          <button
            aria-label="Next slide arrow"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className=""
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContentBlock;
