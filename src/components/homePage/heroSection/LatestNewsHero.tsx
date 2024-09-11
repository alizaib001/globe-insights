import React from "react";
import { getPostsLatest } from "@/utils/sanityQueries"; // Importing the function to fetch posts
import { capitalizeEachWord } from "@/utils/capitalizeEachWord";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import Link from "next/link";

export const LatestNewsHero = async () => {
  const posts = await getPostsLatest();

  return (
    <div className="no-scrollbar flex basis-full flex-col gap-4 overflow-y-scroll rounded-lg bg-slate-800 py-1 md:max-h-[430px] md:basis-5/12 lg:max-h-[544px] lg:basis-1/3 lg:py-3 font-serif">
      <div className="p-4 text-sky-50">
        <h2 className="mb-4 text-xl font-bold">MORE TOP STORIES</h2>
        <ul className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post: any, index: number) => (
              <li key={index} className="group flex items-start">
                <span className="mr-3 text-xl">▶</span>
                <Link
                  href={`/${post.slug}`}
                  className="group-hover:text-white transition-colors duration-200 ease-in-out"
                >
                  <div className="mb-1 font-semibold">
                    {capitalizeEachWord(post.title)}
                  </div>
                  <div className="text-sm text-gray-300">
                    News • {formatRelativeDate(post.publishedAt)}
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="mb-1 font-semibold tracking-tight text-gray-100">
              This content is currently unavailable.
              <br /> Please check back later.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};
