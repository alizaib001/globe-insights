import { getPost, getPostsSlug } from "@/utils/sanityQueries"; // Importing functions for fetching post data
import Image from "next/image"; // Importing Image component from Next.js
import { urlForImage } from "../../../sanity/lib/image"; // Importing function for generating image URLs
import { PortableText } from "@portabletext/react"; // Importing PortableText component for rendering rich text
import { notFound } from "next/navigation"; // Importing function for rendering a 404 page
import { RelatedNews } from "@/components/blogPostPage/RelatedNews"; // Importing RelatedNews component
import { LatestSideBar } from "@/components/blogPostPage/LatestSideBar"; // Importing LatestSideBar component
import { TopSideBar } from "@/components/blogPostPage/TopSideBar"; // Importing TopSideBar component

// Function to generate static parameters for dynamic routes
export async function generateStaticParams() {
  const blogPostSlugs: string[] = await getPostsSlug(); // Fetching blog post slugs
  return blogPostSlugs.map((blogPost) => ({
    blogPost: blogPost, // Mapping each slug to an object with key "blogPost"
  }));
}
export const dynamicParams = true; // Setting dynamicParams to true indicating dynamic route

// Component for rendering individual blog posts
export default async function BlogPost({
  params, // Destructuring params object containing blogPost slug
  searchParams, // Destructuring searchParams object containing id
}: {
  params: { blogPost: string }; // Specifying types for params object
  searchParams: { id: string }; // Specifying types for searchParams object
}) {
  const post = await getPost(params.blogPost); // Fetching post data based on the slug
  if (!post) {
    return notFound(); // Rendering 404 page if post not found
  }

  // Object defining custom components for rendering PortableText
  const myPortableTextComponents = {
    block: {
      // Customizing common block types
      h1: ({ children }: { children: any }) => (
        <h1 className="mb-4 text-4xl font-bold">{children}</h1>
      ),
      h2: ({ children }: { children: any }) => (
        <h2 className="mb-3 text-3xl font-bold">{children}</h2>
      ),
      // Define other heading levels similarly
      normal: ({ children }: { children: any }) => (
        <p className="my-4 text-justify text-lg leading-normal tracking-normal">
          {children}
        </p>
      ),
      blockquote: ({ children }: { children: any }) => (
        <blockquote className="mx-4 border-l-4 border-gray-500 py-2 pl-4">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: { children: any }) => (
        <ul className="my-2 ml-4 list-disc pl-4">{children}</ul>
      ),
      number: ({ children }: { children: any }) => (
        <ol className="my-2 ml-4 list-decimal pl-4">{children}</ol>
      ),
    },
    types: {
      // Custom component for rendering images
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <Image
            alt={value.alt || " "}
            loading="lazy"
            src={urlForImage(value)}
            width={500}
            height={500}
            className="mx-auto w-[90%]"
          />
        );
      },
    },
  };

  return (
    <main className="mx-auto w-full pb-16 pt-8 antialiased lg:pb-24 lg:pt-16">
      <div className="w-full flex-col justify-between px-4">
        <div className="flex w-full flex-col items-start justify-center gap-8 sm:flex-row ">
          <article className="format format-sm sm:format-base lg:format-lg format-blue w-full max-w-4xl font-serif">
            <header className="not-format mb-4 lg:mb-6">
              {/* Rendering post title */}
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                {post.title}
              </h1>
              <address className="mb-6 flex items-center not-italic">
                {/* Rendering author information */}
                <div className="mr-3 inline-flex items-center text-sm text-gray-900">
                  <div>
                    <p
                      rel="author"
                      className="text-lg font-semibold text-gray-700"
                    >
                      {post.author.name}
                    </p>
                    <p className="text-base text-gray-500">
                      {/* Formatting and rendering published date */}
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              {/* Rendering main image if available */}
              {post.mainImage && (
                <figure>
                  <Image
                    src={urlForImage(post.mainImage)}
                    alt="Blog Image"
                    className="w-full rounded-sm bg-white"
                    width={500}
                    height={500}
                  />
                </figure>
              )}
            </header>
            {/* Rendering post body */}
            {post.prBody ? (
              // If post has pre-rendered body, render it
              <div
                dangerouslySetInnerHTML={{ __html: post.prBody }}
                className="my-4 text-justify text-lg leading-normal tracking-normal"
              />
            ) : (
              // If post has structured body content, render using PortableText component
              <PortableText
                value={post.body}
                // @ts-ignore
                components={myPortableTextComponents}
              />
            )}
          </article>

          <div className="flex w-full flex-col items-center justify-center gap-8 sm:w-[300px] sm:flex-col">
            {/* Render latest sidebar component */}
            <LatestSideBar />
            {/* Render top sidebar component */}
            <TopSideBar />
          </div>
        </div>
        {/* Render related news component */}
        <RelatedNews post={post} />
      </div>
    </main>
  );
}
