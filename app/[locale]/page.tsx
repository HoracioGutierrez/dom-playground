"use client";
import { useRef } from "react";
import Dropzone from "@/components/dropzone";
import { DOMPreview } from "@/components/dom-preview";
import TagSelectorPannel from "@/components/tag-selector-pannel";

export default function Home() {
  const ref = useRef(null);

  return (
    <section className="grow grid grid-rows-[1fr] gap-4">
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
