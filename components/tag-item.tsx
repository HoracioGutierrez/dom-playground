"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import type { TagItemProps } from "@/lib/types";
import { useTags } from "@/stores/useTags";
import { startTransition, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionValue } from "motion/react";

export const dynamic = "force-dynamic";

function TagItem({ elementConstraints, tag }: TagItemProps) {
  const {
    setTarget,
    target,
    isDragging,
    setIsDragging,
    setDraggingTag,
    draggingTag,
    setError,
    setHoveredTarget,
    hoveredTarget,
  } = useTags();
  const ref = useRef<HTMLDivElement>(null);

  const opacity = useMotionValue(0);
  const width = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

  const handleDrag = (e: PointerEvent) => {
    if (!ref.current) return;

    startTransition(() => {
      mouseX.set(e.clientX - initialOffset.x);
      mouseY.set(e.clientY - initialOffset.y);
    });

    if (!isDragging) {
      const rect = ref.current.getBoundingClientRect();
      width.set(rect.width);
      opacity.set(1);

      setInitialOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      setIsDragging(true);
    }

    if (!(e.target instanceof HTMLElement)) return;

    if (target !== e.target.id) {
      setTarget(e.target.id);
    }

    if (!draggingTag || draggingTag.name !== tag.name) {
      setDraggingTag(tag);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTarget("");
    setDraggingTag(null);
    setError(null);
    opacity.set(0);
  };

  const handleShowTooltip = () => {
    setHoveredTarget(tag.description);
  };

  return (
    <>
      <motion.div
        ref={ref}
        className="z-50 relative"
        drag
        dragConstraints={elementConstraints}
        dragElastic={0.3}
        dragSnapToOrigin
        whileDrag={{
          scale: 0.9,
          pointerEvents: "none",
          opacity: 0,
          transition: { duration: 0 },
        }}
        whileTap={{ scale: 0.9 }}
        dragTransition={{ bounceStiffness: 800, bounceDamping: 15 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        data-tag={JSON.stringify(tag)}
        whileHover="hover"
      >
        <Button
          className="w-[calc(100%_-_4px)] cursor-pointer"
          onMouseEnter={handleShowTooltip}
          onMouseLeave={()=>setHoveredTarget("")}
        >
          {`<${tag.name}/>`}
        </Button>
      </motion.div>
      {typeof document !== "undefined" &&
        createPortal(
          <motion.div
            className="fixed z-50 pointer-events-none flex"
            style={{
              width,
              opacity,
              left: mouseX,
              top: mouseY,
            }}
          >
            <Button className="w-[calc(100%_-_4px)] cursor-pointer opacity-30">
              {`<${tag.name}/>`}
            </Button>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
export default TagItem;
