import {
  getPostsLatestCount,
  getPostsLatestFirstBatch,
} from "@/utils/sanityQueries"; // Import functions to fetch latest news posts from Sanity
import { LatestNewsPageHeader } from "@/components/latestNewsPage/LatestNewsPageHeader"; // Import LatestNewsPageHeader component
import { LatestNewsPlaceHolder } from "@/components/latestNewsPage/LatestNewsPlaceHolder"; // Import LatestNewsPlaceHolder component
import { LatestNewsTile } from "@/components/latestNewsPage/LatestNewsTile"; // Import LatestNewsTile component
import { PaginationBar } from "@/components/ui/PaginationBar"; // Import PaginationBar component

// Define the LatestNews component as an async function
export default async function LatestNews() {
  // Fetch the latest news posts
  const posts = await getPostsLatestFirstBatch(); // Get the first batch of latest news posts
  const postCount = await getPostsLatestCount(); // Get the total count of latest news posts
  const postPerPage = 20; // Number of posts per page
  const totalPages = Math.ceil(postCount / postPerPage); // Calculate total number of pages based on post count and posts per page

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Render the header for the latest news page */}
        <LatestNewsPageHeader />

        {/* Conditionally render either the placeholder or the latest news tiles */}
        {posts.length === 0 ? (
          <LatestNewsPlaceHolder /> // Placeholder component when no posts are available
        ) : (
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Map through each post and render a LatestNewsTile component for each */}
            {posts.map((post: any, index: any) => (
              <LatestNewsTile key={index} post={post} /> // LatestNewsTile component for displaying individual post
            ))}
          </div>
        )}
        {/* PaginationBar component */}
        <div className="mt-10">
          <PaginationBar
            totalPages={totalPages} // Total number of pages
            currentPage={1} // Current page number
            basePath="./latest-news/" // Base path for pagination links
            seachParams="pr" // Search parameters for pagination links
          />
        </div>
      </div>
    </div>
  );
}
