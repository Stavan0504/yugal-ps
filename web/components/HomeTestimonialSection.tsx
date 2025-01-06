import { TestimonialSection } from "@/lib/sanity/types";
import Image from "next/image";

interface HomeTestimonialSectionProps {
  contentItem: TestimonialSection;
}

const HomeTestimonialSection: React.FC<HomeTestimonialSectionProps> = ({
  contentItem,
}) => {
  const { title, svgImage, reviews, buttonText, bgImage } = contentItem;

  return (
    <div className=" relative  pt-12 overflow-hidden">
      <div className="w-full relative h-[80px] sm:h-[120px]">
        <Image
          src={bgImage?.src}
          alt={bgImage?.altText || "Background"}
          width={bgImage?.width}
          height={bgImage?.height}
          layout="responsive"
          objectFit="cover"
          className="w-full !h-[130px] sm:!h-[180px] absolute top-[-60%] object-cover"
        />
      </div>
      <div className="bg-trustedGradient pb-[220px] sm:pb-[350px]">

        <div className="relative z-10 container ">
          <h2 className="text-center text-[30px] md:text-[36px] lg:text-[50px] font-bold text-black mb-[26px]">
            {title}
          </h2>

          {svgImage && (
            <div className="flex justify-center mb-10">
              <Image
                src={svgImage?.src}
                alt={svgImage?.altText || ""}
                width={180}
                height={180}
                className="w-full max-w-[160px] h-[25px] object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] gap-y-[80px] mt-[100px]">
            {reviews?.map((review, index) => (
              <div
                key={index}
                className=" relative border-[1px] border-[#B3B3B3] rounded-[10px] px-[27px] pt-[61px] pb-[35px]"
              >
                <div className="">
                  <Image
                    src={review?.image?.src}
                    alt={review?.image?.altText || "User Image"}
                    width={120}
                    height={120}
                    objectFit="cover"
                    className="absolute top-[-23%] w-full max-w-[132px] h-[110px] object-cover"
                  />
                </div>

                <p className="text-black font-light text-base mb-3 leading-[128%]">{review.review}</p>

                <p className="font-semibold text-xl text-black">{review.name}</p>

                <p className="text-base text-black">{review.location}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="px-[27px] py-2 shadow-customerReviewSahdow bg-brand-cyan text-white text-[20px] md:text-[25px] rounded-full transition mt-[57px] capitalize border-[1px] border-transparent hover:border-brand-cyan hover:bg-transparent hover:text-brand-cyan BasicTransition">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonialSection;
