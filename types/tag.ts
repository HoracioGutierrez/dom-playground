import type { Attribute, PossibleChildren } from "@/lib/types";

export interface Tag {
  id: string;
  name: string;
  hasChildren: boolean;
  children: Tag[];
  possibleChildren: PossibleChildren[];
  description: string;
  attributes: Attribute[];
} 