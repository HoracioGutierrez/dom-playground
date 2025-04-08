"use client"
import TagItem from "@/components/tag-item";
import { ScrollArea } from '@/components/ui/scroll-area'
import { tags } from "@/lib/tags";
import { Tag } from "@/lib/types";
import { T } from "gt-next";
import { AnimatePresence, useAnimate } from "motion/react";
import * as motion from "motion/react-client"
import { useRef, useState } from "react";

export default function Home() {

  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggingTag, setDraggingTag] = useState<Tag | null>(null)
  const [scope, animate] = useAnimate()
  const [children, setChildren] = useState<Tag[]>([])

  const handleDragOverAnimation = () => {
    if (!isDragging) return

    if (!draggingTag) return

    //validate HTML constraints
    if (draggingTag.name === "html" && children.length > 0) {
      return animate(scope.current, { backgroundColor: "#ff6669" })
    }

    if (draggingTag.name !== "html" && children.length === 0) {
      return animate(scope.current, { backgroundColor: "#ff6669" })
    }

    animate(scope.current, { backgroundColor: "#7a83ff" })
  }

  const handleDragOverEndAnimation = () => {
    animate(scope.current, { backgroundColor: "#ffffff00" })
  }

  const handleDropAnimation = () => {
    handleDragOverEndAnimation()

    if (!draggingTag) return

    if (draggingTag.name === "html" && children.length > 0) return

    if (draggingTag.name !== "html" && children.length === 0) return

    const newTag = {
      ...draggingTag,
      id: draggingTag.id + (children.length + 1)
    }
    setChildren([...children, newTag])
  }

  return (
    <section className="grow grid grid-rows-[min-content_1fr] gap-4">
      <div className="py-8">
        <T>
          <h2 className="font-heading text-3xl">Welcome!</h2>
          <p className="text-foreground/50 font-base">Drag and drop HTML tags to the left into the dropzone to the right.</p>
        </T>
      </div>
      <div className="grid lg:grid-cols-[min-content_1fr] gap-4 grow" ref={ref}>
        <ScrollArea className="rounded-base h-full w-[350px] border-4 border-dashed bg-main/20 backdrop-blur-[2px] p-4 grow" id="scrollable">
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
                />
              )
            })}
          </div>
        </ScrollArea>
        <motion.div
          ref={scope}
          id="dropzone"
          initial="initial"
          animate="animate"
          exit="exit"
          className="border-4 border-dashed rounded-base p-4 flex flex-col gap-2"
          onMouseEnter={handleDragOverAnimation}
          onMouseLeave={handleDragOverEndAnimation}
          onMouseUp={handleDropAnimation}
        >
          <AnimatePresence>
            {children.map((tag) => {
              return (
                <motion.div
                  key={tag.id}
                  className="rounded-base bg-main/20 backdrop-blur-[2px] p-4 border-4"
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 }
                  }}
                >
                  <p className="text-foreground">{tag.name}</p>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
