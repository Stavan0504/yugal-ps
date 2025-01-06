// import HomeHeroSection from "@/components/HomeHeroSection";
// import HomeStepsSections from "@/components/HomeStepsSection";
// import HomeContactUsSection from "@/components/HomeContactUsSection";
// import {
//   HeroSection,
//   StepsSectionProps,
//   ContactUsSectionProps,
// } from "@/lib/sanity/types";
// import HomeContentBlock from "@/components/HomeContentBlock";
// import HomeTestimonialSection from "@/components/HomeTestimonialSection";
// import HomeWhyChooseUs from "@/components/HomeWhyChooseUs";
// import HomeContacSection from "@/components/HomeContacSection";
// import HomeHowItWorksSection from "@/components/HomeHowItWorksSection";
// import HomeBlogSection from "@/components/HomeBlogSection";

// export const renderSectionContent = (contentItem: any) => {
//   switch (contentItem._type) {
//     case "homeHeroSection":
//       const heroSection: HeroSection = {
//         headline: contentItem.headline,
//         description: contentItem.description,
//         button1: contentItem.button1,
//         button2: contentItem.button2,
//         coupleImage: contentItem.coupleImage,
//         backgroundImage: contentItem.backgroundImage,
//       };
//       return <HomeHeroSection key={contentItem._id} data={heroSection} />;

//     case "homeContentBlock":
//       return <HomeContentBlock key={contentItem._id} data={contentItem} />;

//     case "homeTestimonialSection":
//       return <HomeTestimonialSection contentItem={contentItem} />;

//     case "homewhyChooseUs":
//       return <HomeWhyChooseUs contentItem={contentItem} />;

//     case "homeContactSection":
//       return <HomeContacSection contentItem={contentItem} />;

//     case "homeHowItWorks":
//       return <HomeHowItWorksSection contentItem={contentItem} />;

//     case "homeBlogSection":
//       return <HomeBlogSection contentItem={contentItem} />;

//     case "homelastSection":
//       const contactUsSection: ContactUsSectionProps = {
//         headline: contentItem.headline,
//         btntext: contentItem.btntext,
//       };
//       return (
//         <HomeContactUsSection
//           key={contentItem._id}
//           contactusSection={contactUsSection}
//         />
//       );

//     default:
//       return null;
//   }
// };
