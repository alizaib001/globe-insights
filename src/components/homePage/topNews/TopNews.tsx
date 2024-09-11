// Importing the getPostsTop function from the sanityQueries module in the utils directory
import { getPostsTop } from "@/utils/sanityQueries";
// Importing the TopSectionHeadline component from the TopSectionHeadline module in the same directory
import { TopSectionHeadline } from "./TopSectionHeadline";
// Importing the TopSectionPostPlaceHolder component from the TopSectionPostPlaceHolder module in the same directory
import { TopSectionPostPlaceHolder } from "./TopSectionPostPlaceHolder";
// Importing the TopSectionPost component from the TopSectionPost module in the same directory
import { TopSectionPost } from "./TopSectionPost";

// Default function for the TopNews component
export default async function TopNews() {
  // Fetching top posts using the getPostsTop function
  const posts = await getPostsTop();

  return (
    // Main container div for the top news section with white background
    <div className="bg-white">
      {/* Container div with maximum width and padding */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        {/* Rendering the TopSectionHeadline component */}
        <TopSectionHeadline />
        {/* Conditional rendering based on whether there are posts available */}
        {posts.length > 0 ? (
          // If there are posts available, render them in a grid layout
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-8 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Mapping over each post and rendering the TopSectionPost component for each */}
            {posts.map((post: any, index: any) => (
              <TopSectionPost key={index} post={post} />
            ))}
          </div>
        ) : (
          // If there are no posts available, render the TopSectionPostPlaceHolder component
          <TopSectionPostPlaceHolder />
        )}
      </div>
    </div>
  );
}
