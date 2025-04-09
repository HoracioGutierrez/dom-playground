"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { DroppableTagItemProps, Tag } from "@/lib/types";
import { AnimatePresence, useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { useTags } from "@/stores/useTags";

function DroppableTagItem({ elementConstraints, tag, isDragging, setTarget, children, setChildren, draggingTag, target }: DroppableTagItemProps) {

    const [scope, animate] = useAnimate()
    const [isHovered, setIsHovered] = useState(false)
    const [canBeDropped, setCanBeDropped] = useState(false)
    const { draggingTag: store_draggingTag, target: store_target, isDragging: store_isDragging, children: store_children, setChildren: store_setChildren, setTarget: store_setTarget, setIsDragging, setDraggingTag , setError } = useTags()


    useEffect(() => {
        if (store_isDragging && store_target === tag.id) {
            handleDragOverAnimation()
        }

        if (store_isDragging && store_target !== tag.id) {
            handleDragOverEndAnimation()
        }

        if (!store_isDragging) {
            handleDragOverEndAnimation()
        }
    }, [store_isDragging, store_target])

    const handleDrag = () => {
    };

    const handleDragEnd = () => {
        animate(scope.current.children[0], { backgroundColor: "#7a83ff" })
    };

    const addChildren = (children: Tag[], newTag: Tag, containerTag: Tag): Tag[] => {

        const formatNewTag = {
            ...newTag,
            id: newTag.id + "-" + Math.random().toString(36).substr(2, 9)
        }

        const childrenCopy = [...children]

        return childrenCopy.map((child: Tag) => {

            if (child.id === containerTag.id) {
                return {
                    ...child,
                    children: [...child.children!, formatNewTag]
                }
            }

            if (child.children && child.children.length > 0) {
                return {
                    ...child,
                    children: addChildren(child.children, formatNewTag, containerTag)
                }
            }

            return child
        })
    }

    const handleDragOverAnimation = () => {
        let canBeDropped = false;

        tag.possibleChildren.forEach((child) => {
            if (child.name === store_draggingTag?.name) {
                canBeDropped = true
            }
        })

        if (canBeDropped) {
            animate(scope.current.children[0], { backgroundColor: "#00bd84" })
            setCanBeDropped(true)
        } else {
            animate(scope.current.children[0], { backgroundColor: "#ff6669" })
            setError(`The tag ${store_draggingTag?.name} cannot be placed inside a ${tag.name} tag as one of it's direct children`)
        }
    }

    const handleDragOverEndAnimation = () => {
        animate(scope.current.children[0], { backgroundColor: "#7a83ff" })
        setCanBeDropped(false)
        setError("")
    }

    const handleDropAnimation = () => {
        let canBeDropped = false;

        tag.possibleChildren.forEach((child) => {
            if (child.name === store_draggingTag?.name) {
                canBeDropped = true
            }
        })

        if (canBeDropped && store_target === tag.id) {
            const result = addChildren(store_children, store_draggingTag!, tag)
            store_setChildren(result)
            store_setTarget("")
            setIsDragging(false)
            setDraggingTag(null)
        }
    }

    return (
        <motion.div
            className="z-0 w-full"
            /* id={tag.id} */
            ref={scope}
            drag
            dragConstraints={elementConstraints}
            dragElastic={0.3}
            dragSnapToOrigin
            whileDrag={{ scale: 0.9, pointerEvents: "none" }}
            whileTap={{ scale: 0.9 }}
            dragTransition={{ bounceDamping: 15, bounceStiffness: 800 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            /* onMouseEnter={handleDragOverAnimation}
            onMouseLeave={handleDragOverEndAnimation} */
            onMouseUp={handleDropAnimation}
            data-tag={JSON.stringify(tag)}
            variants={{
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 50 }
            }}
        >
            <Button className="w-[calc(100%_-_4px)] cursor-pointer flex flex-col gap-2 h-auto z-0" asChild id={tag.id}>
                <div className="w-full">
                    {tag.name}
                    <AnimatePresence>
                        {canBeDropped && (
                            <motion.div
                                className="border-dashed border-2 rounded-base p-2 text-sm font-bold text-foreground w-full pointer-events-none"
                                variants={{
                                    initial: { opacity: 0, x: 50 },
                                    animate: { opacity: 1, x: 0 },
                                    exit: { opacity: 0, x: 50 }
                                }}
                            >
                                new item
                            </motion.div>
                        )}
                        {tag.children && tag.children.map((child) => {
                            return (
                                <DroppableTagItem
                                    key={child.id}
                                    tag={child}
                                    elementConstraints={scope}
                                    isDragging={isDragging}
                                    setTarget={setTarget}
                                    setChildren={setChildren}
                                    children={child.children}
                                    draggingTag={draggingTag}
                                    target={target}
                                />
                            )
                        })}
                    </AnimatePresence>
                </div>
            </Button>
        </motion.div>
    )
}
export default DroppableTagItem