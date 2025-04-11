import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Tag } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateHTML = (tag: Tag): string => {
  if (!tag.children || tag.children.length === 0) {
    return `<${tag.name}/>`;
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

  return `<${tag.name}>\n${childrenHTML}\n</${tag.name}>`;
};
