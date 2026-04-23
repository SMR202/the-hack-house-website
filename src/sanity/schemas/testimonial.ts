import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "childAge",
      title: "Child Age Description",
      type: "string",
      description: 'e.g. "Mom of Lily, 8"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "program",
      title: "Program Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "parent",
      subtitle: "program",
    },
  },
});
