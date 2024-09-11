import { getPostsLatestSide } from "@/utils/sanityQueries";
import Link from "next/link";
import React from "react";

/**
 * Component for rendering the latest sidebar
 */
export const LatestSideBar = async () => {
  // Fetch latest posts
  const postLatest = await getPostsLatestSide();

  return (
    <div className="flex min-w-full flex-col gap-4 rounded-md border-t-[5px] border-solid border-gray-900 bg-gray-50 p-4 sm:min-w-full">
      <h5 className="flex w-full justify-center text-2xl font-semibold text-gray-600">
        Latest News
      </h5>
      <div>
        <ul className="flex list-disc flex-col gap-2 pl-4">
          {postLatest.map((post: any, index: any) => (
            <li
              key={index}
              className="cursor-pointer text-base font-medium text-gray-500 hover:font-semibold hover:text-blue-500 "
            >
              {/* Link to the post */}
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
