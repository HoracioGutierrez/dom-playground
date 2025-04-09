"use client"
import Dropzone from "@/components/dropzone";
import TagItem from "@/components/tag-item";
import { ScrollArea } from '@/components/ui/scroll-area'
import { tags } from "@/lib/tags";
import { Tag } from "@/lib/types";
import { useTags } from "@/stores/useTags";
import { T } from "gt-next";
import { useRef, useState } from "react";

export default function Home() {

  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggingTag, setDraggingTag] = useState<Tag | null>(null)
  const [children, setChildren] = useState<Tag[]>([])
  const [target, setTarget] = useState<string | null>(null)
  const { target: store_target } = useTags()

  return (
    <section className="grow grid grid-rows-[min-content_1fr] gap-4">
      <div className="py-8">
        <T>
          <h2 className="font-heading text-3xl">Welcome!</h2>
          <p className="text-foreground/50 font-base">Drag and drop HTML tags to the left into the dropzone to the right.</p>
        </T>
      </div>
      <div className="grid lg:grid-cols-[min-content_1fr] gap-4 grow" ref={ref}>
        <ScrollArea className="rounded-base h-full w-[350px] border-4 border-border border-dashed bg-main/20 backdrop-blur-[2px] p-4 grow z-50" id="scrollable">
          <div className="flex flex-col gap-2">
            {tags.map((tag) => {
              return (
                <TagItem
                  key={tag.id}
                  elementConstraints={ref}
                  setIsDragging={setIsDragging}
                  isDragging={isDragging}
                  tag={tag}
                  setDraggingTag={setDraggingTag}
                  setTarget={setTarget}
                  target={target}
                />
              )
            })}
          </div>
        </ScrollArea>
        <Dropzone
          children={children}
          setChildren={setChildren}
          isDragging={isDragging}
          draggingTag={draggingTag}
          setTarget={setTarget}
          target={target}
        />
      </div>
    </section>
  );
}
