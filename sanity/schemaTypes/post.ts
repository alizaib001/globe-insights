import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required().error("Slug is required"),
      options: {
        source: "title",
        maxLength: 200,
      },
    }),
    defineField({
      name: "top",
      title: "Top",
      type: "boolean",
      description:
        "Check if this post to be published in top news section. By default, it will not be published in top news section.",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "boolean",
      description:
        "Check if this post to be featured in hero section. By default, it will not be featured in hero section.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      description: "A short summary of the article",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one category is required"),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("Body is required"),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required().error("Author is required"),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Published at is required"),
    }),
    defineField({
      name: "websites",
      title: "Websites",
      type: "array",
      of: [{ type: "reference", to: { type: "website" } }],
      description:
        "Kindly select a website or list of websites where this post will be published.",
      validation: (Rule) =>
        Rule.required().min(1).error("At least one website is required"),
    }),
    defineField({
      name: "prBody",
      title: "PR Body",
      type: "string",
      readOnly: true,
      description:
        "This filed will be filled automatically when a press release is created. Do not edit this field manually.",
    }),
    defineField({
      name: "pr",
      title: "PR",
      type: "boolean",
      readOnly: true,
      description:
        "This filed will be filled automatically when a press release is created. Do not edit this field manually.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      top: "top",
      hero: "hero",
      publishedAt: "publishedAt",
      media: "mainImage",
      prBody: "prBody",
    },
    prepare(selection) {
      const { title, author, top, hero, publishedAt, media, prBody } =
        selection;
      const publishedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : "Not published";

      const additionalInfo = [];
      if (hero) additionalInfo.push("hero");
      if (top) additionalInfo.push("top");
      const sourceInfo = prBody ? "api" : "studio";
      additionalInfo.push(sourceInfo);

      return {
        title: `${title} (${publishedDate})`,
        subtitle: author
          ? `by ${author} ${additionalInfo.length ? `(${additionalInfo.join(", ")})` : ""}`
          : "",
        media,
      };
    },
  },
});
