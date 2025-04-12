"use client";
import * as motion from "motion/react-client";
import type { DroppableTagItemProps, Tag } from "@/lib/types";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { useTags } from "@/stores/useTags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AttributesModal from "./attributes-modal";

function DroppableTagItem({ elementConstraints, tag }: DroppableTagItemProps) {
  const [scope, animate] = useAnimate();
  const [canBeDropped, setCanBeDropped] = useState(false);
  const {
    draggingTag,
    target,
    isDragging,
    children,
    setChildren,
    setTarget,
    setIsDragging,
    setDraggingTag,
    setError,
    setAttributesModalOpen,
    setAttributesTag,
  } = useTags();

  useEffect(() => {
    if (isDragging && target === tag.id) {
      handleDragOverAnimation();
    }

    if (isDragging && target !== tag.id) {
      handleDragOverEndAnimation();
    }

    if (!isDragging) {
      handleDragOverEndAnimation();
    }
  }, [isDragging, target, tag.id]);

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
      if (child.name === draggingTag?.name) {
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
        `The tag <${draggingTag?.name}/> cannot be placed inside a <${tag.name}/> tag as one of it's direct children`,
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
      if (child.name === draggingTag?.name) {
        canBeDropped = true;
        break;
      }
    }
    if (canBeDropped && target === tag.id && draggingTag) {
      const result = addChildren(children, draggingTag, tag);
      setChildren(result);
      setTarget("");
      setIsDragging(false);
      setDraggingTag(null);
    }
  };
  const handleHoverEnter = () => {};

  const handleHoverLeave = () => {};

  const handleRemove = () => {
    // Find the tag in the children array and remove it
    const removeTag = (children: Tag[], tagToRemove: Tag): Tag[] => {
      return children.filter((child) => {
        if (child.id === tagToRemove.id) {
          return false;
        }

        if (child.children && child.children.length > 0) {
          child.children = removeTag(child.children, tagToRemove);
        }

        return true;
      });
    };

    // Remove the current tag from the children array
    const updatedChildren = removeTag(children, tag);
    setChildren(updatedChildren);

    // Reset any relevant state
    setTarget("");
    setIsDragging(false);
    setDraggingTag(null);
    setError(null);
  };

  const handleOpenAttributesEditor = () => {
    setAttributesModalOpen(true);
    setAttributesTag(tag);
  };

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
      onMouseUp={handleDropAnimation}
      data-tag={JSON.stringify(tag)}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      }}
    >
      <Card
        id={tag.id}
        className="gap-2 !shadow-none bg-[#fef3c8] text-main-foreground p-3"
      >
        <CardHeader
          className={cn("gap-0 px-0", isDragging && "pointer-events-none")}
        >
          <CardTitle className="text-lg flex items-center gap-2 group">
            {tag.name}
            {tag.attributes.filter(attr => attr.value).map((attr) => (
              <div key={attr.name} className="relative group">
                <span 
                  className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-main-foreground/10 text-main-foreground"
                  /* title={`${attr.value}`} */
                >
                  {attr.name}
                </span>
                <div className="absolute z-50 invisible group-hover:visible bg-black text-white text-xs rounded p-1 -mt-1 min-w-max">
                  {attr.value}
                </div>
              </div>
            ))}
            <AttributesModal tag={tag} />
            <Trash2
              className="size-5 text-main-foreground/20 hover:text-main-foreground cursor-pointer"
              onClick={handleRemove}
            />
          </CardTitle>
        </CardHeader>
        {tag.children?.map((child) => {
          return (
            <DroppableTagItem
              key={child.id}
              tag={child}
              elementConstraints={scope}
            />
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
