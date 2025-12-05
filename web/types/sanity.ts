import type { PortableTextBlock } from "@portabletext/types";

export interface BrewingInstructions {
  amount?: string;
  temperature?: string;
  steepTime?: string;
}

export interface TeaCategory {
  title?: string;
  description?: string;
  color?: string;
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
  description?: string;
  origin?: string;
  flavorNotes?: string[];
  category?: TeaCategory;
  imageUrl?: string;
  brewingInstructions?: BrewingInstructions;
}

export interface Homepage {
  title?: string;
  introduction?: string;
  featuredTeas?: FeaturedTea[];
}
