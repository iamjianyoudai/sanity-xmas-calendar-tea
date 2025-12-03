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
