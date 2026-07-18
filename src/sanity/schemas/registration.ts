import { defineField, defineType } from "sanity";

export const registration = defineType({
  name: "registration",
  title: "Registration",
  type: "document",
  fields: [
    defineField({ name: "participantName", title: "Participant Name", type: "string", readOnly: true }),
    defineField({ name: "participantAge", title: "Participant Age", type: "string", readOnly: true }),
    defineField({ name: "contactName", title: "Contact Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", readOnly: true }),
    defineField({ name: "owner", title: "Program Owner", type: "string", readOnly: true }),
    defineField({ name: "programId", title: "Program ID", type: "string", readOnly: true }),
    defineField({ name: "programTitle", title: "Program", type: "string", readOnly: true }),
    defineField({ name: "source", title: "Source", type: "string", readOnly: true }),
    defineField({ name: "notes", title: "Notes", type: "text", readOnly: true }),
    defineField({ name: "consent", title: "Consent Given", type: "boolean", readOnly: true }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  orderings: [{ title: "Newest first", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: {
    select: { title: "participantName", program: "programTitle", status: "status" },
    prepare: ({ title, program, status }) => ({ title, subtitle: `${program ?? "General enquiry"} · ${status ?? "new"}` }),
  },
});
