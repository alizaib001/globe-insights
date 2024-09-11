// Importing React library for building the component
import React from "react";

// Importing Next.js Link component for client-side navigation
import Link from "next/link";

// Importing ChevronsRight icon from lucide-react library for the right arrow icon
import { ChevronsRight } from "lucide-react";

// Defining the interface for the props that the component will receive
interface HomeCategoryTitleProps {
  category: { title: string; slug: string };
}

// Defining and exporting the HomeCategoryTitle functional component
export const HomeCategoryTitle: React.FC<HomeCategoryTitleProps> = async ({
  category,
}) => {
  return (
    // Container div with margin bottom, flex properties for layout, and gap between elements
    <div className="mb-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-0">
      {/* Displaying the category title in a heading element */}
      <h5 className="text-xl font-semibold text-gray-600">{category.title}</h5>

      {/* Link to the category page, with a "Read More" text and an icon */}
      <Link href={`/categories/${category.slug}`} className="inline-flex gap-2">
        {/* "Read More" text */}
        <p className="text-gray-600">Read More</p>
        {/* Right arrow icon */}
        <ChevronsRight color="gray" />
      </Link>
    </div>
  );
};
