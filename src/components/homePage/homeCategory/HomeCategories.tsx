// Importing the React library to build the component
import React from "react";
// Importing a utility function to fetch categories' titles and slugs
import { getCategoriesTitleSlug } from "@/utils/sanityQueries";
// Importing the HomeCategoryTitle component to display category titles
import { HomeCategoryTitle } from "./HomeCategoryTitle";
// Importing the HomeCategoryContent component to display category content
import { HomeCategoryContent } from "./HomeCategoryContent";

// Defining and exporting the HomeCategories asynchronous functional component
export const HomeCategories = async () => {
  // Fetching the categories' titles and slugs
  const cats = await getCategoriesTitleSlug();

  // Returning an empty div if there are no categories
  if (!cats) return <div></div>;
  if (cats.length === 0) return <div></div>;

  return (
    // Container div with flex properties
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col gap-2">
        {/* Mapping through the categories and rendering HomeCategoryTitle and HomeCategoryContent for each */}
        {cats.map((cat: any, index: any) => (
          <div key={index} className="w-full">
            <div className="my-4 w-full">
              <HomeCategoryTitle category={cat} />
              <HomeCategoryContent slug={cat.slug} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
