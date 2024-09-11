import React from "react"; // Import React library
import Link from "next/link"; // Import Link component from Next.js for client-side navigation
import Image from "next/image"; // Import Image component from Next.js for optimized image loading
import { urlForImage } from "../../../sanity/lib/image"; // Import function for generating image URLs

// Define interface for LatestNewsTileProps
interface LatestNewsTileProps {
  post: any; // Define interface for post data
}

// LatestNewsTile component definition using React Functional Component with LatestNewsTileProps
export const LatestNewsTile: React.FC<LatestNewsTileProps> = ({ post }) => {
  return (
    <div className="flex max-w-xl flex-col items-start justify-between rounded-lg p-2">
      {/* Post publication date and category label */}
      <div className="flex items-center gap-x-4 text-xs">
        <p className="text-gray-500">
          {/* Display post publication date */}
          {new Date(post.publishedAt).toLocaleDateString("en-US")}
        </p>
        <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {/* If category title exists, display it, otherwise show default label */}
          Press Release
        </div>
      </div>
      {/* Post title and summary */}
      <div className="flex flex-grow flex-col">
        <div className="group relative flex-grow">
          {/* Link to post page */}
          <Link
            href={`/${post.slug}`}
            className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
          >
            {/* Display post title */}
            {post.title}
          </Link>
          {/* Display post summary if it exists */}
          {post.summary && (
            <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">
              {post.summary}
            </p>
          )}
        </div>
        {/* Author's profile image and name */}
        <div className="relative mt-8 flex items-center gap-x-4">
          {/* Display author's profile image */}
          <Image
            src={urlForImage(post.author.image)} // Get the URL for the author's image
            alt="Profile Image" // Alt text for the image
            className="h-10 w-10 rounded-full bg-gray-50" // CSS classes for height, width, and rounded corners
            width={500} // Image width
            height={500} // Image height
          />
          {/* Display author's name */}
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">{post.author.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
