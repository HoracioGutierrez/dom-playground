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

const generateHTML = (tag: Tag): string => {
  if (!tag.children || tag.children.length === 0) {
    return `<${tag.name}/>`;
  }
  
  const childrenHTML = tag.children
    .map(child => {
      const childContent = generateHTML(child)
        .split('\n')
        .map(line => '  ' + line)
        .join('\n');
      return childContent;
    })
    .join('\n');

  return `<${tag.name}>\n${childrenHTML}\n</${tag.name}>`;
};

export default function Home() {

  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggingTag, setDraggingTag] = useState<Tag | null>(null)
  const [children, setChildren] = useState<Tag[]>([])
  const [target, setTarget] = useState<string | null>(null)
  const { target: store_target, children: store_children } = useTags()


  return (
    <section className="grow grid grid-rows-[min-content_1fr] gap-4">
      <div className="py-8 flex flex-col 2xl:justify-center 2xl:text-center">
        <T>
          <h2 className="font-heading text-3xl">The DOM Playground</h2>
          <p className="text-foreground/50 font-base">Drag and drop HTML tags to the left into the dropzone to the right.</p>
        </T>
      </div>
      <div className="grid lg:grid-cols-[min-content_1fr_auto] gap-4 grow xl:gap-8 2xl:max-w-[1566px] mx-auto w-full" ref={ref}>
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
            <ScrollArea className="rounded-base justify-center lg:h-[calc(100dvh_-_480px)] h-[200px] mt-8 w-full border-2 border-border border-dashed bg-main/20 p-4 grow z-50" id="scrollable">
              <div className="flex lg:flex-col gap-4 flex-wrap">
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
                <p className="text-foreground/50 font-base mb-8">The HTML code generated from the tags you have dropped.</p>
                {store_children.length > 0 ? (
                  <>
                    <div className="border-dashed border-2 border-border bg-main/50 p-4 rounded-md text-foreground font-mono">
                      {/* HTML String View */}
                      <pre className="whitespace-pre-wrap">
                        {store_children.map(tag => generateHTML(tag)).join('\n')}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="border-dashed border-2 border-border bg-main/50 p-4 rounded-md text-foreground/50">
                    <p>You haven't dropped any tags yet!</p>
                  </div>
                )}
              </T>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );

}
