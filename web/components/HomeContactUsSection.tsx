import { ContactUsSectionProps } from "@/lib/sanity/types";
import Link from "next/link";

interface HomeContactUsSectionProps {
  key: string;
  contactusSection: ContactUsSectionProps;
}

const HomeContactUsSection: React.FC<HomeContactUsSectionProps> = ({
  contactusSection,
}) => {
  const { headline, btntext } = contactusSection;

  return (
    <div className="bg-brand-stone">
      <div className="container">
        <div className="flex md:flex-row flex-col items-center justify-between py-9 gap-4 gap-y-8">
          {headline && (
            <h2 className="text-[30px] md:text-[36px] lg:text-[50px] text-white text-center leading-[100%]">
              {headline}
            </h2>
          )}
          <Link href="/sign-up">
            {btntext && (
              <button className="bg-getstartbutton text-white text-[30px] lg:text-[40px] px-[50px] lg:px-[60px] capitalize py-[10px] rounded-[10px] shadow-getstartbuttonShadow hover:scale-105 BasicTransition">
                {btntext}
              </button>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContactUsSection;
