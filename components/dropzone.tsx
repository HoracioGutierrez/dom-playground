"use client";
import DroppableTagItem from "@/components/droppable-tag-item";
import { useTags } from "@/stores/useTags";
import { T } from "gt-next";
import { ArrowBigDown, Info } from "lucide-react";
import { AnimatePresence, useAnimate } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect } from "react";

function Dropzone() {
  const [scope, animate] = useAnimate();
  const {
    draggingTag,
    target,
    isDragging,
    children,
    setChildren,
    error,
    setTarget,
  } = useTags();

  useEffect(() => {
    if (isDragging && target === "dropzone") {
      handleDragOverAnimation();
    }

    if (isDragging && target !== "dropzone") {
      handleDragOverEndAnimation();
    }

    if (!isDragging) {
      handleDragOverEndAnimation();
    }
  }, [isDragging, target]);

  const handleDragOverAnimation = () => {
    if (!isDragging) return;
    if (!draggingTag) return;
    if (!target) return;
    if (target !== "dropzone") return;

    if (draggingTag.name !== "html" && children.length === 0) {
      return animate(scope.current, { backgroundColor: "#ff6669" });
    }

    if (draggingTag.name === "html" && children.length > 0) {
      return animate(scope.current, { backgroundColor: "#ff6669" });
    }

    if (draggingTag.name !== "html" && children.length >= 1) {
      return animate(scope.current, { backgroundColor: "#ff6669" });
    }

    animate(scope.current, { backgroundColor: "#00bd84" });
  };

  const handleDragOverEndAnimation = () => {
    animate(scope.current, { backgroundColor: "#7a83ff33" });
  };

  const handleDropAnimation = () => {
    handleDragOverEndAnimation();

    if (!draggingTag) return;

    if (draggingTag.name === "html" && children.length > 0) return;

    if (draggingTag.name !== "html" && children.length === 0) return;

    if (draggingTag.name !== "html" && children.length >= 1) return;

    const newTag = {
      ...draggingTag,
      id: `${draggingTag.id}-${Math.random().toString(36).substring(2, 15)}`,
    };

    setChildren([...children, newTag]);
  };

  return (
    <motion.div
      ref={scope}
      id="dropzone"
      initial="initial"
      animate="animate"
      exit="exit"
      className="border-2 border-dashed rounded-base p-4 flex flex-col gap-2 z-0 border-border bg-main/20 relative"
      onMouseUp={handleDropAnimation}
    >
      <AnimatePresence>
        {children.map((tag) => {
          return (
            <DroppableTagItem
              key={tag.id}
              tag={tag}
              elementConstraints={scope}
            />
          );
        })}
      </AnimatePresence>
      <AnimatePresence>
        {children.length === 0 && (
          <motion.div
            key={"empty"}
            variants={{
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 50 },
            }}
            className="rounded-base p-2 text-lg font-bold text-foreground/50 w-full grow flex justify-center items-center pointer-events-none max-w-2xs flex-col gap-2 text-center mx-auto"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{
                y: 10,
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  bounce: 0.35,
                  duration: 0.5,
                },
              }}
            >
              <ArrowBigDown className="size-10" />
            </motion.div>
            <T>
              Click and drag one of the tags to the left and drop it here to
              start building
            </T>
          </motion.div>
        )}
        {error && (
          <motion.div
            key={"error"}
            variants={{
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 50 },
            }}
            className="pointer-events-none absolute bg-[#ff6669]/50 h-auto p-2 border-4 rounded-md bottom-4 left-4 right-4 flex gap-2 justify-center animate-pulse"
          >
            <Info className="size-10 text-red-400" />
            <T>{error}</T>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export default Dropzone;
