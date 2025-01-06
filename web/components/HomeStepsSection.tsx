import { StepsSectionProps } from "@/lib/sanity/types";
import Image from "next/image";

interface HomeStepsSectionProps {
  key: string;
  stepsSections: StepsSectionProps;
}

const HomeStepsSections: React.FC<HomeStepsSectionProps> = ({
  stepsSections,
}) => {
  const { headline, steps } = stepsSections;

  return (
    <div className="py-[117px]">
      <div className="container">
        {headline && (
          <h2 className="text-[30px] md:text-[36px] lg: text-black text-center leading-[100%]">
            {headline}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[59px] gap-12">
          {steps?.map((step, index) => {
            const { stepNumber, title, description, icon, altText, asset } =
              step;

            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-[18px]"
              >
                {icon && (
                  <div className="w-full max-w-[180px]">
                    <Image
                      src={icon}
                      alt={altText || "steps"}
                      width={200}
                      height={200}
                      className="w-full max-w-[180px] h-[190px] object-cover"
                    />
                  </div>
                )}
                {title && (
                  <h3 className="text-[30px] text-black text-center">
                    {title}
                  </h3>
                )}
                {asset && (
                  <div>
                    <Image
                      src={asset?.src as string}
                      alt={altText || "Content image"}
                      width={600}
                      height={400}
                      className="w-full max-w-[119px] h-[19px] object-cover"
                    />
                  </div>
                )}
                {description && (
                  <p className="text-[18px] text-center text-black">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeStepsSections;
