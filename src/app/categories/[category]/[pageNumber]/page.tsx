// Importing necessary functions and components
import {
  getCategoriesSlug,
  getCategory,
  getPostsCategory,
  getPostsCategoryCount,
  getPostsCategoryPage,
} from "@/utils/sanityQueries"; // Functions to fetch category data and posts from Sanity
import { notFound } from "next/navigation"; // Function from Next.js for handling 404 errors
import { CategoryPageHeader } from "@/components/categoryPage/CategoryPageHeader"; // CategoryPageHeader component
import { CategoryPostsPlaceHolder } from "@/components/categoryPage/CategoryPostsPlaceHolder"; // Placeholder component
import { CategoryPostTile } from "@/components/categoryPage/CategoryPostTile"; // CategoryPostTile component
import { PaginationBar } from "@/components/ui/PaginationBar"; // PaginationBar component

// Categories page component
export default async function Categories({
  params, // Params object containing dynamic parameters
  searchParams, // Search parameters
}: {
  params: { pageNumber: string }; // Type definition for params object
  searchParams: { id: string }; // Type definition for searchParams object
}) {
  // Fetching category details based on the provided category slug
  const categoryDetail = await getCategory(searchParams.id);

  // If category detail is not found, return a 404 page
  if (!categoryDetail) {
    return notFound();
  }

  // Fetching total count of posts for pagination
  const postCount = await getPostsCategoryCount(searchParams.id);
  const postPerPage = 20;
  const totalPages = Math.ceil(postCount / postPerPage);

  // Fetching posts for the specified category and pagination
  const posts = await getPostsCategoryPage(
    searchParams.id,
    Number(params.pageNumber) * postPerPage - postPerPage,
    postPerPage * Number(params.pageNumber),
  );

  // Render the Categories page
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Render the category page header */}
        <CategoryPageHeader category={categoryDetail[0]} />

        {/* Conditional rendering for category posts */}
        {posts.length === 0 ? (
          // Render placeholder if no posts are found
          <CategoryPostsPlaceHolder />
        ) : (
          // Render category post tiles if posts are available
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post: any, index: any) => (
              // Render each category post tile
              <CategoryPostTile
                key={index}
                post={post}
                category={categoryDetail[0]}
              />
            ))}
          </div>
        )}
        {/* Pagination bar */}
        <div className="mt-10">
          <PaginationBar
            totalPages={totalPages}
            currentPage={Number(params.pageNumber)}
            basePath="./"
            seachParams={searchParams.id}
          />
        </div>
      </div>
    </div>
  );
}