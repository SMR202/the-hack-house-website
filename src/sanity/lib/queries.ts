const PROGRAM_OWNER = `coalesce(
  owner,
  select(
    slug.current == "haven-therapy-services" => "haven-autism",
    type in ["montessori", "camp"] || section == "haven-montessori" => "haven-montessori",
    "hack-house"
  )
)`;

const PROGRAM_IN_SCOPE = `(
  defined(owner) ||
  slug.current == "haven-therapy-services" ||
  type in ["montessori", "camp"] ||
  section == "haven-montessori" ||
  !defined(section) ||
  (section == "crash-courses-children" && slug.current in ["toddler-tot-program", "little-leaders-growth", "teen-led-program"])
)`;

const PROGRAM_FIELDS = `
  _id,
  title,
  "id": slug.current,
  "owner": ${PROGRAM_OWNER},
  ageLabel,
  duration,
  price,
  spotsLeft,
  totalSpots,
  dates,
  time,
  location,
  "image": select(
    image match "*1510915361894-db8b7855a8a4*" => "/images/program-fallback.jpg",
    image match "*1514315384763-ba401779410f*" => "/images/program-fallback.jpg",
    image match "*1522071820081-009f0129c71c*" => "/images/program-fallback.jpg",
    image
  ),
  gallery,
  shortDescription,
  longDescription,
  "highlights": coalesce(highlights, whatKidsWillDo, []),
  instructor,
  featured,
  order
`;

export const ALL_PROGRAMS_QUERY = /* groq */ `
  *[_type == "program" && ${PROGRAM_IN_SCOPE}] | order(order asc, _createdAt asc) {
    ${PROGRAM_FIELDS}
  }
`;

export const PROGRAMS_BY_OWNER_QUERY = /* groq */ `
  *[_type == "program" && ${PROGRAM_IN_SCOPE} && ${PROGRAM_OWNER} == $owner] | order(order asc, _createdAt asc) {
    ${PROGRAM_FIELDS}
  }
`;

export const PROGRAM_BY_SLUG_QUERY = /* groq */ `
  *[_type == "program" && ${PROGRAM_IN_SCOPE} && slug.current == $slug][0] {
    ${PROGRAM_FIELDS}
  }
`;

export const FEATURED_PROGRAMS_QUERY = /* groq */ `
  *[_type == "program" && ${PROGRAM_IN_SCOPE} && featured == true] | order(order asc, _createdAt asc) [0...6] {
    ${PROGRAM_FIELDS}
  }
`;

export const RELATED_PROGRAMS_QUERY = /* groq */ `
  *[
    _type == "program" &&
    ${PROGRAM_IN_SCOPE} &&
    slug.current != $slug &&
    ${PROGRAM_OWNER} == $owner
  ] | order(order asc, _createdAt asc) [0...3] {
    ${PROGRAM_FIELDS}
  }
`;

export const ALL_TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    quote,
    parent,
    childAge,
    program,
    rating
  }
`;

export const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    stats,
    team,
    heroSlides,
    whatsappNumber,
    email,
    address,
    mapUrl,
    instagramUrl,
    facebookUrl
  }
`;

export const ALL_PROGRAM_SLUGS_QUERY = /* groq */ `
  *[_type == "program" && ${PROGRAM_IN_SCOPE} && defined(slug.current)] {
    "programId": slug.current
  }
`;
