import React from "react"; // Importing the React library
import { urlForImage } from "../../../../sanity/lib/image"; // Importing the urlForImage function from the image module in the Sanity library
import Link from "next/link"; // Importing the Link component from Next.js
import Image from "next/image"; // Importing the Image component from Next.js
import defaultImage from "@/../public/defaultImage.jpg"; // Importing a default image // Importing the default image

// Define the structure of the props for the TopSectionPost component
interface TopSectionPostProps {
  post: any; // The post object
}

// Define and export the TopSectionPost component using React Functional Component (React.FC) with props of type TopSectionPostProps
export const TopSectionPost: React.FC<TopSectionPostProps> = ({ post }) => {
  return (
    <div className="mx-auto flex max-w-[24rem] flex-col gap-4 rounded-xl sm:max-w-xl md:max-w-3xl md:flex-row">
      {/* Left/Top Image */}
      <div className="basis-2/5 object-cover">
        <Image
          src={post.mainImage ? urlForImage(post.mainImage) : defaultImage}
          alt="main"
          width={650}
          height={650}
          className="h-full w-full rounded-t-xl md:rounded-l-xl md:rounded-r-none"
          priority={true}
        />
      </div>
      {/* Right/Bottom Description Section */}
      <div className="flex basis-3/5 flex-col justify-between">
        <div>
          <div className="flex items-start text-xs">
            {/* Link to the category */}
            <Link
              href={`/categories/${post.categories[0].slug}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {post.categories ? post.categories[0].title : "Press Release"}
            </Link>
          </div>
          {/* Description Heading*/}
          <Link
            className="mt-3 text-lg font-semibold leading-6 text-gray-700 hover:text-gray-900"
            href={`/${post.slug}`}
          >
            {post.title}
          </Link>
          {/* Description Detail */}
          <p className="mt-3 line-clamp-3 flex-grow overflow-hidden text-sm text-gray-500">
            {post.summary && post.summary}
          </p>
        </div>
        {/* Author detail */}
        <div className="mt-3 flex items-center leading-none">
          {/* Author Image */}
          <Image
            src={urlForImage(post.author.image)}
            alt="Profile Image"
            className="mr-4 h-11 w-11 rounded-full"
            width={500}
            height={500}
          />
          {/* Author Details */}
          <div>
            <p className="text-sm font-bold text-gray-600">
              {post.author.name}
            </p>
            <span className="text-sm text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
          {/* Share Button */}
          <Link
            className="ml-auto flex-shrink-0 rounded-full bg-gray-200 p-3 hover:cursor-pointer"
            href={`/${post.slug}`}
          >
            <Image
              src="https://res.cloudinary.com/thirus/image/upload/v1632854290/logos/icon-share_frvrfu.svg"
              alt=""
              width={15}
              height={15}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
