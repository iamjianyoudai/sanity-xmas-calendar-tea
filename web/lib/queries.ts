export const homepageQuery = `
  *[_type == "homepage"][0] {
    headerTitle,
    subtitle,
    teaTypes[]->{
      _id,
      name,
      "slug": slug.current
    }
  }
`;

// Query to fetch a single tea by slug (with category info)
export const teaBySlugQuery = `
  *[_type == "tea" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "alt": coalesce(alt, asset->altText)
      }
    },
    origin,
    flavorNotes,
    "imageUrl": image.asset->url,
    brewingInstructions {
      amount,
      temperature,
      steepTime
    },
    "category": category->{
      _id,
      name,
      "slug": slug.current,
      description
    }
  }
`;

// Query to fetch a tea type by slug (pulls related teas via references)
export const teaTypeBySlugQuery = `
  *[_type == "teaType" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    flavorNotes,
    brewingInstructions {
      amount,
      temperature,
      steepTime
    },

    "relatedTeas": relatedTeas[]->{
      _id,
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      flavorNotes
    }
  }
`;

// Query to fetch all teas with category info (for listing/filtering)
export const allTeasQuery = `
  *[_type == "tea"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    flavorNotes,
    origin,
    "category": category->{
      _id,
      name,
      "slug": slug.current
    }
  }
`;
