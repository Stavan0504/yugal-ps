"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { HeaderDataProps } from "@/lib/sanity/types";

const Header: React.FC<HeaderDataProps> = ({ variant, logo, label }) => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        "w-full flex justify-center border-b  py-4  z-50 ",
        variant === "transparent" ? scrolled < 200
          ? "bg-transparent fixed top-0 border-transparent "
          : "bg-white fixed top-0 border-b-foreground/10 BasicTransition " : "bg-white fixed top-0 border-b-foreground/10 BasicTransition "
      )}
    >
      <div className="container">
        <div className="w-full gap-4 flex justify-between items-center">
          <div className=" w-full max-w-[178px]">
            <Link href={"/"}>
              <Image
                src={logo?.src as string}
                width={logo?.width}
                height={logo?.height}
                alt="Logo"
                className={clsx(
                  "w-full max-w-[150px] em:max-w-[178px] h-[35px] em:h-[45px] object-cover",
                  variant === "transparent" ? scrolled < 200 ? "brightness-[250]" : ""
                    : ""
                )}
              />
            </Link>
          </div>

          <Link
            href={"/contact-us"}
            className="px-[23px] py-[7px] text-base text-white rounded-[10px] flex justify-center items-center bg-buttonGradient hover:scale-105 BasicTransition whitespace-nowrap "
          >
            {label}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
