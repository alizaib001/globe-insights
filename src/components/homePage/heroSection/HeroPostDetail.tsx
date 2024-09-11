import Image from "next/image";
import React from "react";
import { urlForImage } from "../../../../sanity/lib/image"; // Function to generate image URLs
import defaultImage from "@/../public/defaultImage.jpg"; // Importing a default image
import Link from "next/link"; // Importing Link for navigation

// Defining the props interface for HeroPostDetail component
interface HeroPostDetailProps {
  post?: any; // Post data can be of any type
  firstPost?: boolean; // Indicates if this is the first post
  sliderPost?: boolean; // Indicates if this post is part of a slider
}

// Functional component HeroPostDetail to display details of a hero post
export const HeroPostDetail: React.FC<HeroPostDetailProps> = ({
  post,
  firstPost = false,
  sliderPost = false,
}) => {
  return (
    <div
      // Conditional classes for different post types
      className={`group relative basis-full overflow-hidden rounded-md bg-gradient-to-r from-cyan-200 to-blue-200 ${
        firstPost
          ? `max-h-[260px] min-h-[260px] sm:max-h-[320px] sm:min-h-[320px] lg:max-h-[480px] lg:min-h-[480px] lg:basis-1/2`
          : `max-h-[190px] min-h-[190px] sm:basis-1/2 lg:max-h-[232px] lg:min-h-[232px]`
      }`}
    >
      {/* Link to the post, or a placeholder link if no slug is provided */}
      <Link href={post && post.slug ? `/${post.slug}` : "#"}>
        {/* Displaying the post image, or a default image if none is provided */}
        <Image
          src={
            post && post.mainImage ? urlForImage(post.mainImage) : defaultImage
          }
          alt="main"
          width={500}
          height={500}
          // Conditional classes for image transition effects
          className={`absolute inset-0 h-full w-full rounded-md object-cover ${
            !sliderPost &&
            `transition-transform duration-300 ease-in-out group-hover:scale-110`
          }`}
        />
      </Link>

      {/* Link with post title and possibly the published date */}
      <Link
        href={post && post.slug ? `/${post.slug}` : "#"}
        className="absolute bottom-0 left-0 flex w-full flex-col bg-gradient-to-b from-slate-800 to-slate-700 p-2 font-serif font-medium text-sky-50 transition-transform duration-300 ease-in-out group-hover:bg-gradient-to-b group-hover:from-slate-900 group-hover:to-slate-800 group-hover:text-white"
      >
        {/* Displaying the post title or a placeholder text */}
        <p
          className={
            firstPost
              ? `line-clamp-3 text-xl sm:line-clamp-none md:text-2xl`
              : `line-clamp-2 text-lg sm:line-clamp-3 md:text-xl`
          }
        >
          {post && post.title ? post.title : "Content Coming Soon"}
        </p>
        {/* Displaying the published date for the first post */}
        {firstPost && (
          <p className="mt-4 text-base font-normal md:text-lg">
            {post &&
              new Date(post.publishedAt).toLocaleDateString("en-US", {
                day: "numeric",
                year: "numeric",
                month: "long",
              })}
          </p>
        )}
      </Link>
    </div>
  );
};
