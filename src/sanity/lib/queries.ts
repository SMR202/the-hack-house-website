/* ------------------------------------------------------------------ */
/*  GROQ queries — one per data need, all revalidated at 60s (ISR)    */
/* ------------------------------------------------------------------ */

// All programs (for listings)
export const ALL_PROGRAMS_QUERY = /* groq */ `
  *[_type == "program"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    gallery,
    shortDescription,
    longDescription,
    whatKidsWillDo,
    instructor,
    type,
    campType,
    featured,
    order
  }
`;

// Single program by slug
export const PROGRAM_BY_SLUG_QUERY = /* groq */ `
  *[_type == "program" && slug.current == $slug][0] {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    gallery,
    shortDescription,
    longDescription,
    whatKidsWillDo,
    instructor,
    type,
    campType,
    featured,
    order
  }
`;

// Featured programs (homepage)
export const FEATURED_PROGRAMS_QUERY = /* groq */ `
  *[_type == "program" && featured == true] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    gallery,
    shortDescription,
    longDescription,
    whatKidsWillDo,
    instructor,
    type,
    campType
  }
`;

// Programs by age group and type (for workshops/camps pages)
export const PROGRAMS_BY_AGE_AND_TYPE_QUERY = /* groq */ `
  *[_type == "program" && ageGroup == $ageGroup && type == $type] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    gallery,
    shortDescription,
    longDescription,
    whatKidsWillDo,
    instructor,
    type,
    campType
  }
`;

// All workshops (type == "workshop")
export const ALL_WORKSHOPS_QUERY = /* groq */ `
  *[_type == "program" && type == "workshop"] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    shortDescription,
    type,
    campType
  }
`;

// All camps (type == "camp")
export const ALL_CAMPS_QUERY = /* groq */ `
  *[_type == "program" && type == "camp"] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    gallery,
    shortDescription,
    longDescription,
    whatKidsWillDo,
    instructor,
    type,
    campType
  }
`;

// Related programs (same category or age group, excluding current)
export const RELATED_PROGRAMS_QUERY = /* groq */ `
  *[_type == "program" && slug.current != $slug && (category == $category || ageGroup == $ageGroup)][0...3] {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    ageGroup,
    ageLabel,
    duration,
    price,
    spotsLeft,
    totalSpots,
    dates,
    time,
    location,
    image,
    shortDescription,
    type,
    campType
  }
`;

// All age groups
export const ALL_AGE_GROUPS_QUERY = /* groq */ `
  *[_type == "ageGroup"] | order(key asc) {
    _id,
    "id": key,
    key,
    name,
    range,
    tagline,
    campName,
    campRange
  }
`;

// Single age group by key
export const AGE_GROUP_BY_KEY_QUERY = /* groq */ `
  *[_type == "ageGroup" && key == $key][0] {
    _id,
    "id": key,
    key,
    name,
    range,
    tagline,
    campName,
    campRange
  }
`;

// All testimonials
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

// Site settings (singleton)
export const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    stats,
    team,
    categories,
    heroSlides,
    whatsappNumber
  }
`;

// All program slugs (for generateStaticParams)
export const ALL_PROGRAM_SLUGS_QUERY = /* groq */ `
  *[_type == "program" && defined(slug.current)]{
    "programId": slug.current
  }
`;

// All age group keys (for generateStaticParams)
export const ALL_AGE_GROUP_KEYS_QUERY = /* groq */ `
  *[_type == "ageGroup" && defined(key)]{
    "ageGroup": key
  }
`;
