import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Tag } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateHTML = (tag: Tag): string => {
  // Generate attributes string if any attributes have values
  const attributesWithValues = tag.attributes.filter(attr => attr.value);
  const attributesString = attributesWithValues.length > 0 
    ? ` ${attributesWithValues.map(attr => `${attr.name}="${attr.value}"`).join(' ')}`
    : '';

  if (!tag.children || tag.children.length === 0) {
    return `<${tag.name}${attributesString}/>`;
  }

  const childrenHTML = tag.children
    .map((child) => {
      const childContent = generateHTML(child)
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n");
      return childContent;
    })
    .join("\n");

  return `<${tag.name}${attributesString}>\n${childrenHTML}\n</${tag.name}>`;
};
