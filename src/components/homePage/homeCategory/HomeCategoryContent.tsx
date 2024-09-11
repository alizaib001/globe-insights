// Importing the React library to build the component
import React from "react";
// Importing a utility function to fetch posts for a specific category
import { getPostsCategoryThreeMin } from "@/utils/sanityQueries";
// Importing placeholders for hero category content
import { HeroCategoryContentPlaceHolder } from "./HeroCategoryContentPlaceHolder";
// Importing detailed view for hero category content
import { HeroCategoryContentDetail } from "./HeroCategoryContentDetail";

// Defining the interface for the props that the component will receive
interface HomeCategoryContentProps {
  slug: string; // The slug to identify the category
}
// Defining and exporting the HomeCategoryContent functional component
export const HomeCategoryContent: React.FC<HomeCategoryContentProps> = async ({
  slug,
}) => {
  // Fetching the posts for the given category slug
  const posts = await getPostsCategoryThreeMin(slug);
  return (
    // Container div with flex properties, border styling, and padding
    <div className="flex flex-col items-start justify-between border border-dotted border-gray-400 p-4 text-gray-700 lg:flex-row">
      {/* Conditionally rendering the first post or a placeholder if the post is not available */}
      {posts[0] ? (
        <HeroCategoryContentDetail
          styling="border-b border-dotted border-gray-400 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4"
          post={posts[0]}
        />
      ) : (
        <HeroCategoryContentPlaceHolder styling="border-b border-dotted border-gray-400 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4" />
      )}
      {/* Conditionally rendering the second post or a placeholder if the post is not available */}
      {posts[1] ? (
        <HeroCategoryContentDetail
          styling="py-4 lg:px-4 lg:py-0"
          post={posts[1]}
        />
      ) : (
        <HeroCategoryContentPlaceHolder styling="py-4 lg:px-4 lg:py-0" />
      )}
      {/* Conditionally rendering the third post or a placeholder if the post is not available */}
      {posts[2] ? (
        <HeroCategoryContentDetail
          styling="border-t border-dotted border-gray-400 pb-4 pt-4 lg:border-l lg:border-t-0 lg:pb-0 lg:pl-4 lg:pt-0"
          post={posts[2]}
        />
      ) : (
        <HeroCategoryContentPlaceHolder styling="border-t border-dotted border-gray-400 pb-4 pt-4 lg:border-l lg:border-t-0 lg:pb-0 lg:pl-4 lg:pt-0" />
      )}
    </div>
  );
};
