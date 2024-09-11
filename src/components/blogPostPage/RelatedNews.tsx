import {
  getPostsCategoryThree,
  getPostsLatestThree,
} from "@/utils/sanityQueries"; // Importing functions to fetch related posts
import React from "react";
import Image from "next/image"; // Importing Image component from Next.js
import Link from "next/link"; // Importing Link component from Next.js
import { urlForImage } from "../../../sanity/lib/image"; // Importing function to generate image URLs
import defaultImage from "@/../public/defaultImage.jpg"; // Importing placeholder image

interface RelatedNewsProps {
  post: any; // Define props for the RelatedNews component
}

export const RelatedNews: React.FC<RelatedNewsProps> = async ({ post }) => {
  // Define RelatedNews component as an async function component
  // Note: Asynchronous functions are not supported in React function components

  // Fetch related news based on post category or retrieve latest news
  const postCat = post.categories
    ? await getPostsCategoryThree(post.categories[0].slug)
    : await getPostsLatestThree();

  // Render related news section if there are any posts fetched
  return (
    <div>
      {postCat && postCat.length > 0 && (
        <aside
          aria-label="Related articles"
          className="mt-8 bg-gray-50 py-8 lg:py-24"
        >
          <div className="mx-auto max-w-screen-xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Related News
            </h2>
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {/* Map through fetched posts and render each article */}
              {postCat.map((post: any, index: number) => (
                <article
                  key={index}
                  className="flex h-full max-w-xs flex-col space-y-2 border border-gray-200 rounded-lg shadow-md overflow-hidden p-1"
                >
                  {/* Render post main image or placeholder */}
                  <Link
                    href={`/${post.slug}`}
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={
                          post.mainImage ? urlForImage(post.mainImage) : defaultImage
                        } // Use URL for post main image or placeholder
                        alt="Blog Image"
                        className="absolute inset-0 h-full w-full rounded-lg bg-white object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                  </Link>

                  {/* Render post title as a link */}
                  <h2 className="my-2 text-base font-bold leading-tight text-gray-900">
                    <Link href={`/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                </article>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
