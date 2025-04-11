"use client";
import { useRef } from "react";

import Dropzone from "@/components/dropzone";
import { DOMPreview } from "@/components/dom-preview";

import type { Tag } from "@/lib/types";

import TagSelectorPannel from "@/components/tag-selector-pannel";

const generateHTML = (tag: Tag): string => {
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

export default function Home() {
  
  const ref = useRef(null);

  return (
    <section className="grow grid grid-rows-[min-content_1fr] gap-4">
      <div
        ref={ref}
        className="grid lg:grid-cols-[min-content_1fr_auto] gap-4 grow xl:gap-8 2xl:max-w-[1566px] mx-auto w-full"
      >
        <TagSelectorPannel ref={ref} />

        <Dropzone />

        <DOMPreview />
      </div>
    </section>
  );
}
