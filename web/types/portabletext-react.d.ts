declare module "@portabletext/react" {
  import type { ComponentType, ReactNode } from "react";
  import type { PortableTextBlock } from "@portabletext/types";

  export interface PortableTextProps {
    value: PortableTextBlock[] | unknown[];
    components?: PortableTextComponents;
    onMissingComponent?:
      | false
      | ((
          message: string,
          options: { type: string; nodeType: string }
        ) => void);
  }

  export type PortableTextComponent = ComponentType<{
    value?: PortableTextBlock[];
    children?: ReactNode;
  }>;

  export interface PortableTextComponents {
    types?: Record<string, PortableTextComponent>;
    marks?: Record<string, PortableTextComponent>;
    block?: Record<string, PortableTextComponent> | PortableTextComponent;
    list?: Record<string, PortableTextComponent> | PortableTextComponent;
    listItem?: Record<string, PortableTextComponent> | PortableTextComponent;
    hardBreak?: PortableTextComponent | false;
    unknownType?: PortableTextComponent;
    unknownMark?: PortableTextComponent;
    unknownBlockStyle?: PortableTextComponent;
    unknownList?: PortableTextComponent;
    unknownListItem?: PortableTextComponent;
  }

  export const PortableText: ComponentType<PortableTextProps>;
}
