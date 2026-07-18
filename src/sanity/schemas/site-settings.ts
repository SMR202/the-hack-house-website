import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "number", validation: (r) => r.required() }),
            defineField({ name: "suffix", title: "Suffix", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "icon", title: "Icon Emoji", type: "string", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "team",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 2, validation: (r) => r.required() }),
            defineField({ name: "photo", title: "Photo URL", type: "url", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Slideshow",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image URL", type: "url", validation: (r) => r.required() }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "subtitle", title: "Subtitle", type: "string", validation: (r) => r.required() }),
            defineField({ name: "badge", title: "Badge Text", type: "string", validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: 'Include country code, e.g. "+92 300 1234567".',
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "mapUrl", title: "Map Embed URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
