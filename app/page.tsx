//"use client"
import TagItem from "@/components/tag-item";
import { ScrollArea } from '@/components/ui/scroll-area'
import * as motion from "motion/react-client"
//import { useRef, useState } from "react";
import { T } from "gt-next";
import { getGT } from "gt-next/server";

export default async function Home() {

  /* const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
 */
  const t = await getGT()
  return (
    <section className="grow grid lg:grid-cols-[min-content_1fr] gap-4" /* ref={ref} */>
      {/* <ScrollArea className="rounded-base h-full w-[350px] text-main-foreground border-4 border-border border-dashed bg-main/20 backdrop-blur-[2px] p-4 grow" id="scrollable">
        <div className="flex flex-col gap-2">
          <TagItem elementConstraints={ref} setIsDragging={setIsDragging} isDragging={isDragging} />
        </div>
      </ScrollArea> */}
      <T>
        <p>How are you?</p>
        {/* <motion.div onMouseEnter={() => isDragging && console.log("mouse enter")} onMouseUp={() => isDragging && console.log("mouse up")}> */}
        <motion.div>
          draggable
        </motion.div>
      </T>
    </section>
  );
}
