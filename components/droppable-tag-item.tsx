"use client";
import * as motion from "motion/react-client";
import type { DroppableTagItemProps, Tag } from "@/lib/types";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { useTags } from "@/stores/useTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

function DroppableTagItem({ elementConstraints, tag }: DroppableTagItemProps) {
  const [scope, animate] = useAnimate();
  const [canBeDropped, setCanBeDropped] = useState(false);
  const {
    draggingTag: store_draggingTag,
    target: store_target,
    isDragging: store_isDragging,
    children: store_children,
    setChildren: store_setChildren,
    setTarget: store_setTarget,
    setIsDragging,
    setDraggingTag,
    setError,
    setHoveredTarget,
    hoveredTarget,
  } = useTags();

  useEffect(() => {
    if (store_isDragging && store_target === tag.id) {
      handleDragOverAnimation();
    }

    if (store_isDragging && store_target !== tag.id) {
      handleDragOverEndAnimation();
    }

    if (!store_isDragging) {
      handleDragOverEndAnimation();
    }
  }, [store_isDragging, store_target, tag.id]);

  const handleDrag = () => {};

  const handleDragEnd = () => {};

  const addChildren = (
    children: Tag[],
    newTag: Tag,
    containerTag: Tag,
  ): Tag[] => {
    const formatNewTag = {
      ...newTag,
      id: `${newTag.id}-${Math.random().toString(36).substr(2, 9)}`,
    };

    const childrenCopy = [...children];

    return childrenCopy.map((child: Tag) => {
      if (child.id === containerTag.id) {
        return {
          ...child,
          children: [...(child.children || []), formatNewTag],
        };
      }

      if (child.children && child.children.length > 0) {
        return {
          ...child,
          children: addChildren(child.children, formatNewTag, containerTag),
        };
      }

      return child;
    });
  };

  const handleDragOverAnimation = () => {
    let canBeDropped = false;

    for (const child of tag.possibleChildren) {
      if (child.name === store_draggingTag?.name) {
        canBeDropped = true;
        break;
      }
    }

    if (canBeDropped) {
      animate(scope.current.children[0], { backgroundColor: "#00bd84" });
      setCanBeDropped(true);
      setError("");
    } else {
      animate(scope.current.children[0], { backgroundColor: "#ff6669" });
      setError(
        `The tag <${store_draggingTag?.name}/> cannot be placed inside a <${tag.name}/> tag as one of it's direct children`,
      );
    }
  };

  const handleDragOverEndAnimation = () => {
    animate(scope.current.children[0], { backgroundColor: "#fef3c8" });
    setCanBeDropped(false);
  };

  const handleDropAnimation = () => {
    let canBeDropped = false;

    for (const child of tag.possibleChildren) {
      if (child.name === store_draggingTag?.name) {
        canBeDropped = true;
        break;
      }
    }
    if (canBeDropped && store_target === tag.id && store_draggingTag) {
      const result = addChildren(store_children, store_draggingTag, tag);
      store_setChildren(result);
      store_setTarget("");
      setIsDragging(false);
      setDraggingTag(null);
    }
  };
  const handleHoverEnter = () => {};

  const handleHoverLeave = () => {};

  return (
    <motion.div
      className="z-0 w-full"
      ref={scope}
      drag
      dragConstraints={elementConstraints}
      dragElastic={0.3}
      dragSnapToOrigin
      whileDrag={{ scale: 0.9, pointerEvents: "none" }}
      dragTransition={{ bounceDamping: 15, bounceStiffness: 800 }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      onMouseUp={handleDropAnimation}
      data-tag={JSON.stringify(tag)}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
      }}
    >
      <Card
        id={tag.id}
        className="gap-2 !shadow-none bg-[#fef3c8] text-main-foreground p-3"
      >
        <CardHeader className="pointer-events-none gap-0 px-0">
          <CardTitle className="text-lg">{tag.name}</CardTitle>
        </CardHeader>
        {tag.children?.map((child) => {
          return (
            <div className="px-0" key={child.id}>
              <DroppableTagItem
                key={child.id}
                tag={child}
                elementConstraints={scope}
              />
            </div>
          );
        })}
        {tag.children?.length === 0 && (
          <CardContent className="pointer-events-none px-0">
            <div className="border-2 border-dashed border-foreground dark:border-main-foreground/30 rounded-base p-2 pointer-events-none">
              <p className="text-sm text-main-foreground/30 flex items-center gap-2">
                {canBeDropped && <Plus className="size-4" />}
                {canBeDropped ? "New Item" : "No children"}
              </p>
            </div>
          </CardContent>
        )}
        {tag.children.length > 0 && canBeDropped && (
          <CardContent className="pointer-events-none px-0">
            <div className="border-2 border-dashed border-foreground dark:border-main-foreground/30 rounded-base p-2 pointer-events-none">
              <p className="text-sm text-main-foreground/30 flex items-center gap-2">
                {canBeDropped && <Plus className="size-4" />}
                {canBeDropped ? "New Item" : "No children"}
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
export default DroppableTagItem;
