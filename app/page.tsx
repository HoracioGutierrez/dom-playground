"use client"
import TagItem from "@/components/tag-item";
import { ScrollArea } from '@/components/ui/scroll-area'
import { tags } from "@/lib/tags";
import { T } from "gt-next";
import { useAnimate } from "motion/react";
import * as motion from "motion/react-client"
import { useRef, useState } from "react";

export default function Home() {

  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [scope, animate] = useAnimate()

  const handleDragOverAnimation = () => {
    if (!isDragging) return
    animate(scope.current, { backgroundColor: "#7a83ff" })
  }

  const handleDragOverEndAnimation = () => {
    animate(scope.current, { backgroundColor: "#ffffff00" })
  }

  return (
    <section className="grow grid grid-rows-[min-content_1fr] gap-4" ref={ref}>
      <div className="py-8">
        <T>
          <h2 className="font-heading text-3xl">Welcome!</h2>
          <p className="text-foreground/50 font-base">Drag and drop HTML tags to the left into the dropzone to the right.</p>
        </T>
      </div>
      <div className="grid lg:grid-cols-[min-content_1fr] gap-4 grow">
        <ScrollArea className="rounded-base h-full w-[350px] border-4 border-dashed bg-main/20 backdrop-blur-[2px] p-4 grow" id="scrollable">
          <div className="flex flex-col gap-2">
            {tags.map((tag) => {
              return <TagItem key={tag.id} elementConstraints={ref} setIsDragging={setIsDragging} isDragging={isDragging} tag={tag} />
            })}
          </div>
        </ScrollArea>
        <motion.div
          ref={scope}
          id="dropzone"
          className="border-4 border-dashed rounded-base p-4"
          onMouseEnter={handleDragOverAnimation}
          onMouseLeave={handleDragOverEndAnimation}
          onMouseUp={handleDragOverEndAnimation}
        >
          draggable
        </motion.div>
      </div>
    </section>
  );
}
