import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "owner",
      title: "Program Owner",
      type: "string",
      options: {
        list: [
          { title: "The Hack House", value: "hack-house" },
          { title: "Haven Autism", value: "haven-autism" },
          { title: "Haven Montessori", value: "haven-montessori" },
        ],
        layout: "radio",
      },
      initialValue: "hack-house",
      validation: (r) => r.required(),
    }),
    defineField({ name: "ageLabel", title: "Age / Audience Label", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "spotsLeft", title: "Spots Left", type: "number", validation: (r) => r.min(0) }),
    defineField({ name: "totalSpots", title: "Total Spots", type: "number", validation: (r) => r.min(1) }),
    defineField({ name: "dates", title: "Dates", type: "string" }),
    defineField({ name: "time", title: "Time", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "image", title: "Main Image URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "gallery", title: "Gallery Image URLs", type: "array", of: [{ type: "url" }] }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Full Description",
      type: "text",
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlights",
      title: "Program Highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "instructor",
      title: "Program Lead",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 2, validation: (r) => r.required() }),
        defineField({ name: "photo", title: "Photo URL", type: "url", validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on Home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", owner: "owner", ageLabel: "ageLabel" },
    prepare: ({ title, owner, ageLabel }) => ({
      title,
      subtitle: [owner, ageLabel].filter(Boolean).join(" · "),
    }),
  },
});
