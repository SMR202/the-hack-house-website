import { defineType, defineField } from "sanity";

export const ageGroup = defineType({
  name: "ageGroup",
  title: "Age Group",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description: 'Unique key, e.g. "ages-6-9"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: 'e.g. "Little Explorers"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "range",
      title: "Range",
      type: "string",
      description: 'e.g. "Ages 6–9"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: 'e.g. "Big imaginations, endless fun"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "campName",
      title: "Montessori Group Name",
      type: "string",
      description: 'e.g. "Children\'s House"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "campRange",
      title: "Montessori Age Range",
      type: "string",
      description: 'e.g. "Ages 3–6"',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "range",
    },
  },
});
