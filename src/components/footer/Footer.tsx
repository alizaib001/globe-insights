import React from "react"; // Importing the React library
import Link from "next/link"; // Importing the Link component from Next.js
import Image from "next/image"; // Importing the Image component from Next.js
import logo from "@/../public/logo.png"; // Importing the logo image

// Define and export the Footer component
export const Footer = () => {
  return (
    // Main container div for the footer section with margin top
    <div className="mx-auto mt-5 w-full">
      {/* Container div for the footer content with flex layout, padding, and spacing */}
      <div className="flex w-[60%] max-w-[1440px] flex-col items-start justify-between space-y-10 px-5 py-4 sm:px-10 md:px-16 md:py-8 lg:mx-auto lg:w-[100%] lg:flex-row lg:space-x-32 lg:space-y-0 lg:px-20">
        {/* Container for the logo and description */}
        <div className="flex basis-2/5 flex-col space-y-4">
          {/* Link to the home page with the logo */}
          <Link href={"/"} className="h-[70px] w-[75px] cursor-pointer">
            {/* Logo image */}
            <Image src={logo} alt="logo" priority />
          </Link>
          {/* Description of the website */}
          <p className="mt-3 text-gray-600">
            Your Daily Source for the Latest News and Updates.
          </p>
        </div>
      </div>
      {/* Container for the copyright information */}
      <div className="mt-5 border-t-[1px] border-t-gray-300 text-gray-500">
        {/* Container for copyright text with flex layout, padding, and spacing */}
        <div className="flex flex-col items-center justify-center space-x-0 space-y-5 px-5 py-4 sm:px-10 md:px-16 md:py-8 lg:flex-row lg:space-x-20 lg:space-y-0 lg:px-20">
          {/* Copyright text */}
          <div className="">
            Copyright © 2024{" "}
            <span className="font-semibold text-gray-600">
            Globe Insights
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
