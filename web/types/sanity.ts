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

// Page Builder Module Types
export interface TextModule {
  _type: 'textModule';
  _key: string;
  title?: string;
  content?: PortableTextBlock[];
}

export interface VideoModule {
  _type: 'videoModule';
  _key: string;
  title?: string;
  videoUrl?: string;
  caption?: string;
  autoplay?: boolean;
}

export interface BrewingInstructionsModule {
  _type: 'brewingInstructionsModule';
  _key: string;
  title?: string;
  amount?: string;
  temperature?: string;
  steepTime?: string;
}

export type PageBuilderModule = TextModule | VideoModule | BrewingInstructionsModule;

export interface Page {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImageUrl?: string;
  content?: PageBuilderModule[];
}
