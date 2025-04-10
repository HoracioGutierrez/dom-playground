"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { TagItemProps } from "@/lib/types";
import { useTags } from "@/stores/useTags";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionValue, useTransform } from "motion/react";

function TagItem({ elementConstraints, setIsDragging, isDragging, tag, setDraggingTag, setTarget, target }: TagItemProps) {

    const { setTarget: store_setTarget, target: store_target, isDragging: store_isDragging, setIsDragging: store_setIsDragging, setDraggingTag: store_setDraggingTag, draggingTag: store_draggingTag, setError } = useTags()
    const ref = useRef<HTMLDivElement>(null)
    const opacity = useMotionValue(0)
    const width = useMotionValue(0)
    const zIndex = useMotionValue(1000)
    const topClone = useMotionValue(0)
    const leftClone = useMotionValue(0)

    const handleDrag = (e: PointerEvent) => {

        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            topClone.set(rect.top + window.scrollY)
            leftClone.set(rect.left + window.scrollX)
            width.set(rect.width)
            zIndex.set(1000)
            opacity.set(1)
        }

        if (!store_isDragging) {
            store_setIsDragging(true)
        }

        if (e.target instanceof HTMLElement === false) return

        if (store_target !== e.target.id) {
            store_setTarget(e.target.id)
        }

        if (!store_draggingTag) {
            store_setDraggingTag(tag)
        }

        if (store_draggingTag && store_draggingTag.name !== tag.name) {
            store_setDraggingTag(tag)
        }
    };

    const handleDragEnd = () => {
        store_setIsDragging(false)
        store_setTarget("")
        store_setDraggingTag(null)
        setError(null)
        opacity.set(0)
    };

    return (
        <>
            <motion.div
                ref={ref}
                className="z-50"
                drag
                dragConstraints={elementConstraints}
                dragElastic={0.3}
                dragSnapToOrigin
                whileDrag={{ scale: 0.9, pointerEvents: "none", opacity: 0, transition: { duration: 0 } }}
                whileTap={{ scale: 0.9 }}
                dragTransition={{ bounceDamping: 15, bounceStiffness: 800 }}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                data-tag={JSON.stringify(tag)}
            >
                <Button className="w-[calc(100%_-_4px)] cursor-pointer">
                    {`<${tag.name}/>`}
                </Button>
            </motion.div>
            {createPortal(
                <motion.div
                    className="z-50 hidden pointer-events-none"
                    style={{
                        position: "absolute",
                        display: "flex",
                        top: topClone,
                        left: leftClone,
                        width,
                        opacity,
                        zIndex: 1000
                    }}
                >
                    <Button className="w-[calc(100%_-_4px)] cursor-pointer">
                        {`<${tag.name}/>`}
                    </Button>
                </motion.div>,
                document.body
            )}
        </>
    );
}
export default TagItem;