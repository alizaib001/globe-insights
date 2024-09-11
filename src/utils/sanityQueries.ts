import { client } from "@/../sanity/lib/client";

const network = "Fox Network";
const website = "Globe Insights";

/**
 * ***********************************************
 * ***********************************************
 * ************ Revalidation Duration ************
 * ***********************************************
 * ***********************************************
 */
// Navbar menu and categories list on home page --- 31 days
const revalidateCategoriesTitleSlug = 2678400;
// Hero section posts --- 6 hours
const revalidatePostsHero = 21600;
// Latest news on the home page --- 15 minutes
const revalidatePostsLatest = 900;
// Top news on home page --- 2 hours
const revalidatePostsTop = 7200;
// category wise posts on home page --- 1 hour
const revalidatePostsCategoryThreeMin = 10800;
// categories on the categories page --- 31 days
const revalidateCategories = 2678400;
// category on the category page --- 31 days
const revalidateCategory = 2678400;
// post on category 1st page ---  6 hours
const revalidatePostsCategory = 21600;
// post count on category page --- 6 hours
const revalidatePostsCategoryCount = 21600;
// post on category page pagination --- 6 hours
const revalidatePostsCategoryPage = 21600;
// post on latest news page 1st batch--- 15 minutes
const revalidatePostsLatestFirstBatch = 900;
// post count on latest news page --- 15 minutes
const revalidatePostsLatestCount = 900;
// post on latest news page pagination --- 15 minutes
const revalidatePostsLatestPage = 900;
// post details on blog post page --- 1 day
const revalidatePost = 86400;
// pr posts on the side bar of the blog page --- 3 hours
const revalidatePostsLatestSide = 10800;
// posts on the side bar of the blog page --- 6 hours
const revalidatePostsTopSide = 21600;
// latest new three on blog page --- 15 minutes
const revalidatePostsLatestThree = 900;
// related news on blog post page --- 1 day
const revalidatePostsCategoryThree = 86400;

/**
 * ***********************************************
 * ***********************************************
 * ************ Network level queries ************
 * ***********************************************
 * ***********************************************
 */

/**
 * Fetches category titles and slugs from the Sanity dataset.
 * Used in navbar and home page to list categories.
 * revalidate after 31 days.
 */
export async function getCategoriesTitleSlug() {
  const data = await client.fetch(
    `*[_type == "category"]{title,"slug": slug.current}`,
    {},
    {
      next: {
        revalidate: revalidateCategoriesTitleSlug,
      },
    },
  );
  return data;
}

/**
 * Fetches the latest posts from the Sanity dataset.
 * Latest posts are those with the "pr" (Press Release) field defined.
 * Used in the latest news section of the home page.
 * revalidate after 15 Minutes.
 */
export async function getPostsLatest() {
  const data = await client.fetch(
    `*[_type == "post" && defined(pr)] | order(publishedAt desc)
      [0...4] {
        "slug":slug.current,
        title,
        summary,
        author-> {
          name,
          image
        },
        publishedAt
      }`,
    {},
    {
      next: {
        revalidate: revalidatePostsLatest,
      },
    },
  );

  return data;
}

/**
 * Fetches the latest 20 posts from the Sanity dataset that are marked as PR and published before the current time.
 * Used in the latest news page.
 * revalidate after 15 minutes.
 */
export async function getPostsLatestFirstBatch() {
  const data = await client.fetch(
    `*[_type == "post" && defined(pr) && publishedAt < now()] | order(publishedAt desc)
    [0...20]{
        "slug":slug.current,
        title,
        summary,
        author-> {
          name,
          image
        },
        publishedAt
      }`,
    {},
    {
      next: {
        revalidate: revalidatePostsLatestFirstBatch,
      },
    },
  );
  return data;
}

/**
 * Fetches the count of the latest posts from the Sanity dataset that are marked as PR and published before the current time.
 * Used in the latest news page. for the pagination
 * revalidate after 15 minutes.
 */
export async function getPostsLatestCount() {
  const data = await client.fetch(
    `count(*[_type == "post" && defined(pr) && publishedAt < now()])`,
    {},
    {
      next: {
        revalidate: revalidatePostsLatestCount,
      },
    },
  );
  return data;
}

/**
 * Fetches a page of the latest posts from the Sanity dataset that are marked as PR and published before the current time.
 * Used in the latest news page on paginated pages
 */
export async function getPostsLatestPage(start: number, end: number) {
  const data = await client.fetch(
    `*[_type == "post" && defined(pr) && publishedAt < now()] | order(publishedAt desc)
    [${start}...${end}]{
        "slug":slug.current,
        title,
        summary,
        author-> {
          name,
          image
        },
        publishedAt
      }`,
    {},
    {
      next: {
        revalidate: revalidatePostsLatestPage,
      },
    },
  );
  return data;
}

/**
 * Fetches all categories from the Sanity dataset.
 * Used in the categories page.
 * revalidate after 31 days.
 */
export async function getCategories() {
  const data = await client.fetch(
    `*[_type == 'category'] {
        title,
        "slug":slug.current,
        headline,
        picture,
      }`,
    {},
    {
      next: {
        revalidate: revalidateCategories,
      },
    },
  );
  return data;
}

/**
 * Fetches slugs of all categories from the Sanity dataset.
 * Used to generate static paths for dynamic routes.
 * Only used at build time.
 */
export async function getCategoriesSlug() {
  const data = await client.fetch(
    `*[_type == "category"]{"slug": slug.current}`,
  );
  const response: string[] = [];
  data.map((item: { slug: string }) => {
    response.push(item.slug);
  });
  return response;
}

/**
 * Fetches category details based on the provided category slug from the Sanity dataset.
 * Used in the category page. for category details
 * revalidate after 31 days.
 */
export async function getCategory(categorySlug: string) {
  const data = await client.fetch(
    `*[_type == 'category' && slug.current == "${categorySlug}"] {
      title,
      description
    }`,
    {},
    {
      next: {
        revalidate: revalidateCategory,
      },
    },
  );
  return data;
}

/**
 * Retrieves the latest 4 posts along with their titles, slugs, and main images.
 * Used in the related news section of the blog post page.
 * revalidate after 15 minutes.
 */
export async function getPostsLatestThree() {
  const data = await client.fetch(
    `*[_type == "post" && defined(pr)] 
    | order(publishedAt desc) [0...4] {
      title,
        "slug":slug.current,
        mainImage
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsLatestThree,
      },
    },
  );
  return data;
}

/**
 * Fetched latest 10 press releases from the Sanity dataset.
 * Used in the sidebar of the blog page.
 * revalidate after 3 hours.
 */
export async function getPostsLatestSide() {
  const data = await client.fetch(
    `*[_type == "post" && defined(pr)] | order(publishedAt desc)
      [0...10] {
        "slug":slug.current,
        title
      }`,
    {},
    {
      next: {
        revalidate: revalidatePostsLatestSide,
      },
    },
  );

  return data; // Return the fetched latest posts
}

/**
 * Fetches slugs of all posts which or either pr or on the network or website
 * Used to generate static paths for dynamic routes.
 * Only used at build time.
 */
export async function getPostsSlug() {
  // Fetch data
  const data = await client.fetch(
    `*[_type == "post" && (defined(pr) || "${website}" in websites[]->title || "${network}" in websites[]->title)] | order(publishedAt desc) {"slug":slug.current}`,
  );
  // Initialize response array
  const response: string[] = [];
  // Extract slugs from data and push to response array
  data.map((item: { slug: string }) => {
    response.push(item.slug);
  });
  return response;
}

/**
 * Fetches a post by its slug
 * Used to fetch a specific post by its slug
 * used in blog post page
 */
export async function getPost(postSlug: string) {
  // Fetch data
  const data = await client.fetch(
    `*[_type == 'post' && slug.current == "${postSlug}" && (defined(pr) || "${website}" in websites[]->title || "${network}" in websites[]->title)] {
      title,
      mainImage,
      body,
      author-> {
        name,
        description,
        image
      },
      prBody,
      publishedAt,
      "categories":categories[]-> {
        "slug":slug.current,
      },
    }`,
    {},
    {
      next: {
        revalidate: revalidatePost,
      },
    },
  );
  // Return the first item from the data array
  return data[0];
}

/**
 * ***********************************************
 * ***********************************************
 * ************ Website level queries ************
 * ***********************************************
 * ***********************************************
 */

/**
 * Fetches 5 latest hero posts from the Sanity dataset.
 * Hero posts are those marked as hero, published, and associated with specific websites.
 * Used in the hero section of the home page.
 * revalidate after 6 hours.
 */
export async function getPostsHero() {
  const data = await client.fetch(
    `*[_type == "post" && hero == true && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)]
    | order(publishedAt desc)
    [0...5] {
      "slug": slug.current,
      title,
      summary,
      mainImage,
      author-> {
        name,
        image
      },
      publishedAt
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsHero,
      },
    },
  );
  return data;
}

/**
 * Fetches the top posts from the Sanity dataset.
 * Top posts are those marked with the "top" field set to true and published before the current time.
 * Only posts associated with the network or specific websites are considered.
 * Used in the top news section of the home page.
 * revalidate after 2 hours.
 */
export async function getPostsTop() {
  const data = await client.fetch(
    `*[_type == 'post' && top == true && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)]
    | order(publishedAt desc)
    [0...4]{
      "categories":categories[]-> {
        title,
        "slug":slug.current,
      },
      title,
      "slug":slug.current,
      summary,
      author-> {
        name,
        image
      },
      mainImage,
      publishedAt
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsTop,
      },
    },
  );
  return data;
}

/**
 * Fetches the latest three posts belonging to a specific category from the Sanity dataset.
 * Posts must be associated with the specified category, published before the current time,
 * and associated with either the website or network.
 * Used in the category section of the home page.
 * revalidate after 1 hour.
 */
export async function getPostsCategoryThreeMin(category: string) {
  const data = await client.fetch(
    `*[_type == "post" && "${category}" in categories[]->slug.current && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)] 
    | order(publishedAt desc) [0...3] {
      title,
        "slug":slug.current,
        summary,
        mainImage,
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsCategoryThreeMin,
      },
    },
  );
  return data;
}

/**
 * Fetches 20 posts belonging to a specific category from the Sanity dataset.
 * Posts must be associated with the specified category, published before the current time,
 * and associated with either the website or network.
 * Used in the category page to create post tiles
 * revalidate after 6 hours.
 */
export async function getPostsCategory(category: string) {
  const data = await client.fetch(
    `*[_type == "post" && "${category}" in categories[]->slug.current && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)] 
    | order(publishedAt desc) 
    [0...20]{
      title,
        "slug":slug.current,
        summary,
        author-> {
          name,
          image
        },
        publishedAt,
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsCategory,
      },
    },
  );
  return data;
}

/**
 * Fetches the total count of posts belonging to a specific category from the Sanity dataset.
 * Posts must be associated with the specified category, published before the current time,
 * and associated with either the website or network.
 * Used in the category page for pagination.
 * revalidate after 1 day.
 */
export async function getPostsCategoryCount(category: string) {
  const data = await client.fetch(
    `count(*[_type == "post" && "${category}" in categories[]->slug.current && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)])`,
    {},
    {
      next: {
        revalidate: revalidatePostsCategoryCount,
      },
    },
  );
  return data;
}

/**
 * Fetches a page of posts belonging to a specific category from the Sanity dataset.
 * Posts must be associated with the specified category, published before the current time,
 * and associated with either the website or network.
 * Used in the category page for paginated data
 */
export async function getPostsCategoryPage(
  category: string,
  start: number,
  end: number,
) {
  const data = await client.fetch(
    `*[_type == "post" && "${category}" in categories[]->slug.current && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)] 
    | order(publishedAt desc) 
    [${start}...${end}]{
      title,
        "slug":slug.current,
        summary,
        author-> {
          name,
          image
        },
        publishedAt,
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsCategoryPage,
      },
    },
  );
  return data;
}

/**
 * Retrieves the latest three posts from a specified category along with their titles, slugs, summaries, and main images.
 * Posts must be associated with the specified category, published before the current time,
 * and associated with either the website or network.
 * Used in the related news section of the blog post page.
 * revalidate after 1 day. * 

 */
export async function getPostsCategoryThree(category: string) {
  const data = await client.fetch(
    `*[_type == "post" && "${category}" in categories[]->slug.current && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)] 
    | order(publishedAt desc) [0...4] {
      title,
        "slug":slug.current,
        summary,
        mainImage
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsCategoryThree,
      },
    },
  );
  return data;
}

/**
 * Fetches the 10 top posts from the database
 * Top posts are those marked with the "top" field set to true and published before the current time.
 * Only posts associated with the network or specific websites are considered.
 * Used in the sidebar of the blog page
 * revalidate after 6 hours.
 */
export async function getPostsTopSide() {
  const data = await client.fetch(
    `*[_type == 'post' && top == true && publishedAt < now() && ("${website}" in websites[]->title || "${network}" in websites[]->title)]
    | order(publishedAt desc)
    [0...10]{
      title,
      "slug":slug.current
    }`,
    {},
    {
      next: {
        revalidate: revalidatePostsTopSide,
      },
    },
  );
  return data;
}
