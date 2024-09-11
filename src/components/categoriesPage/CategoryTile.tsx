import React from "react";
import black from "@/../public/black.jpg"; // Importing the black image
import Image from "next/image"; // Importing the Image component from Next.js
import Link from "next/link"; // Importing the Link component from Next.js
import { urlForImage } from "../../../sanity/lib/image"; // Importing the urlForImage function

// Define the props interface for the CategoryTile component
interface CategoryTileProps {
  category: any; // Type for the category prop
}

// Define and export the CategoryTile component
export const CategoryTile: React.FC<CategoryTileProps> = ({ category }) => {
  return (
    // Container for the category tile with flexbox layout and styling
    <div className="flex h-full flex-col items-center justify-between rounded-lg border border-gray-200 p-4 shadow">
      {/* Link to the category page */}
      <Link href={`/categories/${category.slug}`}>
        {/* Conditional rendering for category picture */}
        {category.picture ? (
          // Render the category picture if available
          <Image
            className="rounded-t-lg bg-cover"
            src={urlForImage(category.picture)} // Set the image source using urlForImage function
            width={400}
            height={400}
            alt=""
          />
        ) : (
          // Render a default black image if category picture is not available
          <Image
            className="rounded-t-lg bg-cover"
            src={black} // Use the black image as the source
            width={400}
            height={400}
            alt=""
          />
        )}
      </Link>
      {/* Container for category details */}
      <div className="p-5">
        {/* Link to the category page */}
        <Link href={`/categories/${category.slug}`}>
          {/* Category title */}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {category.title}
          </h5>
        </Link>
        {/* Render category headline if available */}
        {category.headline && (
          // Paragraph for category headline
          <p className="mb-3 font-normal text-gray-700 md:line-clamp-3">
            {category.headline}
          </p>
        )}

        {/* Link to the category page with a button */}
        <Link
          href={`/categories/${category.slug}`}
          // Button styles using Tailwind CSS classes
          className={`inline-flex items-center rounded-lg bg-blue-400 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300`}
        >
          {/* Button text */}
          Get Informed
          {/* Arrow icon */}
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            {/* Arrow path */}
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
