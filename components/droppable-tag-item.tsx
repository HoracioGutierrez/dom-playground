"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { DroppableTagItemProps, Tag } from "@/lib/types";
import { AnimatePresence, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

function DroppableTagItem({ elementConstraints, tag, isDragging, setTarget, children, setChildren, draggingTag }: DroppableTagItemProps) {

    const [scope, animate] = useAnimate()
    const [isHovered, setIsHovered] = useState(false)
    const [canBeDropped, setCanBeDropped] = useState(false)

    const handleDrag = () => {
    };

    const handleDragEnd = () => {
        animate(scope.current.children[0], { backgroundColor: "#7a83ff" })
    };


    const check = (children: Tag[]) => {
        let result = false
        children.forEach((child) => {

            child.possibleChildren.forEach((possibleChild) => {
                if (possibleChild.name === draggingTag?.name) {
                    setCanBeDropped(true)
                    result = true
                }
            })

            if (child.children) {
                return check(child.children)
            }
        })
        return result
    }

    const handleDragOverAnimation = (e: DragEvent) => {
        if (!isDragging) return

        if (e.target instanceof HTMLElement) {
            setTarget(e.target.id)
        }

        const result = check(children)
        if(result){
            animate(scope.current.children[0], { backgroundColor: "#00bd84" })
            setIsHovered(true)
        } else {
            animate(scope.current.children[0], { backgroundColor: "#ff6669" }) 
        }
    }

    const handleDragOverEndAnimation = () => {
        if (!isDragging) return
        animate(scope.current.children[0], { backgroundColor: "#7a83ff" })
        setIsHovered(false)
        setCanBeDropped(false)
    }

    const handleDropAnimation = () => {
        handleDragOverEndAnimation()
        /* console.log(children)
        console.log(tag)
        console.log(draggingTag) */
    }

    return (
        <motion.div
            className="z-0"
            id={tag.id}
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
            onMouseEnter={(e) => handleDragOverAnimation(e as unknown as DragEvent)}
            onMouseLeave={handleDragOverEndAnimation}
            onMouseUp={handleDropAnimation}
            data-tag={JSON.stringify(tag)}
            variants={{
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 50 }
            }}
        >
            <Button className="w-[calc(100%_-_4px)] cursor-pointer flex flex-col gap-2 h-auto z-0">
                {tag.name}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="border-dashed border-2 rounded-base p-2 text-sm font-bold text-foreground w-full"
                            variants={{
                                initial: { opacity: 0, x: 50 },
                                animate: { opacity: 1, x: 0 },
                                exit: { opacity: 0, x: 50 }
                            }}
                        >
                            new item
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        </motion.div>
    )
}
export default DroppableTagItem