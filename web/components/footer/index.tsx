import React from "react";
import { query } from "@/lib/sanity/queries";
import client from "@/lib/createClient";
import Image from "next/image";
import { Link, Section } from "@/lib/sanity/types";

const Footer = async () => {
  const FooterData = await client.fetch(query.layoutProps);

  const { logo, sections, copyright, disclaimer } = FooterData.footer;

  return (
    <footer className="w-full  mx-auto text-center text-xs gap-8 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-y-12 gap-8 pt-[50px] md:pt-[80px] lg:pt-[120px] pb-[40px] md:pb-[67px]">
          <div className="w-full max-w-[200px] mt-8">
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt="Logo"
              className="w-full max-w-[150px] md:max-w-[200px] h-[130px] md:h-[175px] object-cover"
            />
          </div>
          <ul className="grid grid-cols-1 em:grid-cols-2 sm:grid-cols-[1fr_1fr_1fr] gap-y-10 gap-4 lg:gap-8 w-full">
            {sections?.map((section: Section, linkIndex: number) => (
              <li key={linkIndex} className="flex flex-col items-start">
                <span
                  key={linkIndex}
                  className="text-xl text-brand-darkcyan font-bold text-start"
                >
                  {section.title}
                </span>
                <div className="flex flex-col items-start mt-[18px] gap-[8px]">
                  {section?.links?.map((link: Link, linkIndex: number) => (
                    <a
                      href={link?.url}
                      className="text-lg text-brand-gray hover:opacity-60 BasicTransition cursor-pointer"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-brand-darkcyan py-4">
        <div className="container">
          <div className="flex lg:flex-row flex-col gap-y-2 items-center justify-between ">
            <span className="text-base lg:tedxt-lg text-white">
              {copyright}
            </span>
            <span className="text-base lg:tedxt-lg text-white">
              {disclaimer}
            </span>
          </div>
        </div>
      </div>

      {/* <ThemeSwitcher /> */}
    </footer>
  );
};

export default Footer;
