import type { PortableTextBlock } from "@portabletext/types";

export interface BrewingInstructions {
  amount?: string;
  temperature?: string;
  steepTime?: string;
}

export interface FeaturedTea {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  origin?: string;
  flavorNotes?: string[];
  category?: string;
  imageUrl?: string;
  brewingInstructions?: BrewingInstructions;
}

export interface Tea {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  body?: PortableTextBlock[];
  origin?: string;
  flavorNotes?: string[];
  imageUrl?: string;
  brewingInstructions?: BrewingInstructions;
  category?: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    description?: string;
  };
}

export interface Homepage {
  title?: string;
  introduction?: string;
  featuredTeas?: FeaturedTea[];
}
