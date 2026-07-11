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
    "section": coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")),
    "subsectionLabel": coalesce(subsectionLabel, select(type in ["montessori", "camp"] => coalesce(campType, "Montessori"), "Haven Autism")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    instructor,
    "type": select(type == "workshop" => "program", type == "camp" => "montessori", type),
    campType,
    featured,
    order
  }
`;

// Programs by the new five-section taxonomy.
export const PROGRAMS_BY_SECTION_QUERY = /* groq */ `
  *[
    _type == "program" &&
    coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")) == $section
  ] | order(order asc, _createdAt asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    "section": coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")),
    "subsectionLabel": coalesce(subsectionLabel, select(type in ["montessori", "camp"] => coalesce(campType, "Montessori"), "Haven Autism")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    instructor,
    "type": select(type == "workshop" => "program", type == "camp" => "montessori", type),
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
    "section": coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")),
    "subsectionLabel": coalesce(subsectionLabel, select(type in ["montessori", "camp"] => coalesce(campType, "Montessori"), "Haven Autism")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    instructor,
    "type": select(type == "workshop" => "program", type == "camp" => "montessori", type),
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
    "section": coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")),
    "subsectionLabel": coalesce(subsectionLabel, select(type in ["montessori", "camp"] => coalesce(campType, "Montessori"), "Haven Autism")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    instructor,
    "type": select(type == "workshop" => "program", type == "camp" => "montessori", type),
    campType
  }
`;

// Programs by age group and type.
export const PROGRAMS_BY_AGE_AND_TYPE_QUERY = /* groq */ `
  *[
    _type == "program" &&
    ageGroup == $ageGroup &&
    (
      ($type == "program" && type in ["program", "workshop"]) ||
      ($type == "montessori" && type in ["montessori", "camp"])
    )
  ] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    "section": coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")),
    "subsectionLabel": coalesce(subsectionLabel, select(type in ["montessori", "camp"] => coalesce(campType, "Montessori"), "Haven Autism")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    instructor,
    "type": select(type == "workshop" => "program", type == "camp" => "montessori", type),
    campType
  }
`;

// All Haven Autism programs. Legacy "workshop" documents are included until content is migrated.
export const ALL_CORE_PROGRAMS_QUERY = /* groq */ `
  *[
    _type == "program" &&
    type in ["program", "workshop"] &&
    coalesce(section, "haven-autism") == "haven-autism"
  ] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    "section": coalesce(section, "haven-autism"),
    "subsectionLabel": coalesce(subsectionLabel, "Haven Autism"),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    "type": select(type == "workshop" => "program", type),
    campType
  }
`;

// Backwards-compatible alias for older imports.
export const ALL_WORKSHOPS_QUERY = ALL_CORE_PROGRAMS_QUERY;

// All Haven Montessori entries. Legacy "camp" documents are included until content is migrated.
export const ALL_MONTESSORI_QUERY = /* groq */ `
  *[
    _type == "program" &&
    (
      type in ["montessori", "camp"] ||
      section == "haven-montessori"
    )
  ] | order(order asc) {
    _id,
    title,
    "id": slug.current,
    category,
    categoryLabel,
    categoryEmoji,
    "section": coalesce(section, "haven-montessori"),
    "subsectionLabel": coalesce(subsectionLabel, coalesce(campType, "Montessori")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    instructor,
    "type": select(type == "camp" => "montessori", type),
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
    "section": coalesce(section, select(type in ["montessori", "camp"] => "haven-montessori", "haven-autism")),
    "subsectionLabel": coalesce(subsectionLabel, select(type in ["montessori", "camp"] => coalesce(campType, "Montessori"), "Haven Autism")),
    "participantKind": coalesce(participantKind, "child"),
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
    "highlights": coalesce(highlights, whatKidsWillDo),
    "type": select(type == "workshop" => "program", type == "camp" => "montessori", type),
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
