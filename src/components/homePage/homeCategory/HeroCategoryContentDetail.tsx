import Image from "next/image";
import Link from "next/link";
import React from "react";
import defaultImage from "@/../public/defaultImage.jpg";
import { urlForImage } from "../../../../sanity/lib/image";

// Define an interface for the Post object
interface Post {
  slug: string; // The unique identifier for the post URL
  summary?: string; // An optional short description of the post
  title: string; // The title of the post
  mainImage: any;
}

// Define an interface for the component's props
interface HeroCategoryContentDetailProps {
  post: Post; // The Post object containing post details
  styling: string; // Prop to accept custom styling classes as a string
}

// Define and export the HeroCategoryContentDetail functional component
export const HeroCategoryContentDetail: React.FC<
  HeroCategoryContentDetailProps
> = ({ styling, post }) => {
  return (
    // Apply the custom styling classes along with default classes
    <div
      className={`flex w-full gap-2 lg:basis-1/3 lg:self-stretch ${styling}`}
    >
      {/* Image component */}
      <div className="w-1/3 justify-center">
        <Image
          src={post.mainImage ? urlForImage(post.mainImage) : defaultImage}
          alt="main"
          width={200} // Specify the desired width
          height={200} // Specify the desired height
          className="w-full rounded-md object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex w-2/3 flex-col gap-2 ">
        <Link
          href={`/${post.slug}`}
          className="text-base font-semibold text-gray-700"
        >
          {post.title}
        </Link>

        {/* Summary */}
        {post.summary && <p className="line-clamp-3 text-sm">{post.summary}</p>}
      </div>
    </div>
  );
};
