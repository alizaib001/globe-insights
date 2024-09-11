import { defineField, defineType } from "sanity";

export default defineType({
  name: "website",
  title: "Website",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Website title is required"),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required().error("Website url is required"),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      validation: (Rule) => Rule.required().error("Website logo is required"),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "network",
      title: "Network",
      type: "boolean",
      description:
        "Check if this website is the main network website. By default, it will not be the main network website.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
      network: "network",
    },
    prepare(selection) {
      const { title, media, network } = selection;
      return {
        title: title,
        subtitle: network ? "Network" : "News",
        media: media,
      };
    },
  },
});
