export const homepageQuery = `
  *[_type == "homepage"][0] {
    title,
    introduction,
    featuredTeas[]-> {
      _id,
      name,
      slug,
      description,
      origin,
      flavorNotes,
      "category": category->title,
      "imageUrl": image.asset->url,
      brewingInstructions {
        amount,
        temperature,
        steepTime
      }
    }
  }
`;

// Query to fetch a single tea by slug
export const teaBySlugQuery = `
  *[_type == "tea" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    origin,
    flavorNotes,
    "category": category-> {
      title,
      description,
      color
    },
    "imageUrl": image.asset->url,
    brewingInstructions {
      amount,
      temperature,
      steepTime
    }
  }
`;
