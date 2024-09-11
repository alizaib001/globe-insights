import {
  getPostsLatestCount,
  getPostsLatestFirstBatch,
  getPostsLatestPage,
} from "@/utils/sanityQueries"; // Import functions to fetch latest news posts from Sanity
import { LatestNewsPageHeader } from "@/components/latestNewsPage/LatestNewsPageHeader"; // Import LatestNewsPageHeader component
import { LatestNewsPlaceHolder } from "@/components/latestNewsPage/LatestNewsPlaceHolder"; // Import LatestNewsPlaceHolder component
import { LatestNewsTile } from "@/components/latestNewsPage/LatestNewsTile"; // Import LatestNewsTile component
import { PaginationBar } from "@/components/ui/PaginationBar"; // Import PaginationBar component
import { notFound } from "next/navigation"; // Import notFound function from Next.js for handling 404 errors

export default async function LatestNews({
  params,
  searchParams,
}: {
  params: { pageNumber: string };
  searchParams: { id: string };
}) {
  // Fetch the total count of latest news posts
  const postCount = await getPostsLatestCount();
  // Calculate the total number of pages based on the total post count
  const postPerPage = 20;
  const totalPages = Math.ceil(postCount / postPerPage);
  // Fetch the latest news posts based on pagination
  const posts = await getPostsLatestPage(
    Number(params.pageNumber) * postPerPage - postPerPage,
    postPerPage * Number(params.pageNumber),
  );

  // If no posts are found, return a 404 page
  if (posts.length === 0) {
    return notFound();
  }

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
        {/* Pagination bar */}
        <div className="mt-10">
          <PaginationBar
            totalPages={totalPages} // Total number of pages
            currentPage={Number(params.pageNumber)} // Current page number
            basePath="./" // Base path for pagination links
            seachParams="pr" // Search parameters for pagination links
          />
        </div>
      </div>
    </div>
  );
}
