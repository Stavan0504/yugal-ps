import HomeBlogSection from "@/components/HomeBlogSection";
import HomeContactSection from "@/components/HomeContacSection";
import HomeContactUsSection from "@/components/HomeContactUsSection";
import HomeContentBlock from "@/components/HomeContentBlock";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeHowItWorksSection from "@/components/HomeHowItWorksSection";
import HomeTestimonialSection from "@/components/HomeTestimonialSection";
import HomeWhyChooseUs from "@/components/HomeWhyChooseUs";
import { ContactUsSectionProps, SectionType } from "@/lib/sanity/types";
import React from "react";

interface SectionProps {
  data: SectionType;
}

const Section: React.FC<SectionProps> = ({ data }) => {
  switch (data._type) {
    case "homeHeroSection":
      return <HomeHeroSection data={data} />;

    case "homeContentBlock":
      return <HomeContentBlock data={data} />;

    case "homeTestimonialSection":
      return <HomeTestimonialSection contentItem={data} />;

    case "homewhyChooseUs":
      return <HomeWhyChooseUs contentItem={data} />;

    case "homeContactSection":
      return <HomeContactSection contentItem={data} />;

    case "homeHowItWorks":
      return <HomeHowItWorksSection contentItem={data} />;

    case "homeBlogSection":
      return <HomeBlogSection contentItem={data} />;

    case "homelastSection":
      const contactUsSection: ContactUsSectionProps = {
        headline: data.headline,
        btntext: data.btntext,
      };
      return (
        <HomeContactUsSection
          key={data._id}
          contactusSection={contactUsSection}
        />
      );

    default:
      return null;
  }
};

export default Section;
