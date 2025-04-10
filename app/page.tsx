"use client"
import Dropzone from "@/components/dropzone";
import TagItem from "@/components/tag-item";
import { ScrollArea } from '@/components/ui/scroll-area'
import { tags } from "@/lib/tags";
import { Tag } from "@/lib/types";
import { useTags } from "@/stores/useTags";
import { T } from "gt-next";
import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default function Home() {

  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggingTag, setDraggingTag] = useState<Tag | null>(null)
  const [children, setChildren] = useState<Tag[]>([])
  const [target, setTarget] = useState<string | null>(null)
  const { target: store_target, children: store_children } = useTags()



  return (
    <section className="grow grid grid-rows-[min-content_1fr] gap-4">
      <div className="py-8">
        <T>
          <h2 className="font-heading text-3xl">The DOM Playground</h2>
          <p className="text-foreground/50 font-base">Drag and drop HTML tags to the left into the dropzone to the right.</p>
        </T>
      </div>
      <div className="grid lg:grid-cols-[min-content_1fr_auto] gap-4 grow" ref={ref}>
        <Card className="w-full min-w-xs">
          <CardHeader>
            <CardTitle>
              <T>
                <h2 className="font-heading text-2xl">HTML Tags</h2>
              </T>
            </CardTitle>
            <CardDescription>
              <T>
                <p className="text-foreground/50 font-base">
                  Hover over a tag to see its description. You can also drag and drop tags into the dropzone to the right.
                </p>
              </T>
            </CardDescription>
            <ScrollArea className="rounded-base h-[calc(100dvh_-_430px)] mt-8 w-full border-2 border-border border-dashed bg-main/20 p-4 grow z-50" id="scrollable">
              <div className="flex flex-col gap-4">
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
          </CardHeader>
        </Card>

        <Dropzone
          children={children}
          setChildren={setChildren}
          isDragging={isDragging}
          draggingTag={draggingTag}
          setTarget={setTarget}
          target={target}
        />
        <Card className="w-full min-w-xs">
          <CardHeader>
            <CardTitle>
              <T>
                <h2 className="font-heading text-2xl">DOM</h2>
              </T>
            </CardTitle>
            <CardDescription>
              <T>
                <p className="text-foreground/50 font-base">The HTML code generated from the tags you have dropped.</p>
              </T>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );

}
