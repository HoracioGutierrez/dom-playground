"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { TagItemProps } from "@/lib/types";
import { useTags } from "@/stores/useTags";
import { startTransition, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMotionValue, useTransform, useMotionTemplate } from "motion/react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const dynamic = "force-dynamic"

function TagItem({ elementConstraints, setIsDragging, isDragging, tag, setDraggingTag, setTarget, target }: TagItemProps) {
    const { setTarget: store_setTarget, target: store_target, isDragging: store_isDragging, setIsDragging: store_setIsDragging, setDraggingTag: store_setDraggingTag, draggingTag: store_draggingTag, setError } = useTags()
    const ref = useRef<HTMLDivElement>(null)

    // Initialize motion values with default styles
    const opacity = useMotionValue(0)
    const width = useMotionValue(0)

    // Track mouse position for overlay
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 })

    const handleDrag = (e: PointerEvent) => {
        if (!ref.current) return;

        startTransition(() => {
            // Update mouse position for overlay
            mouseX.set(e.clientX - initialOffset.x)
            mouseY.set(e.clientY - initialOffset.y)
        })

        // Initial drag setup
        if (!store_isDragging) {
            const rect = ref.current.getBoundingClientRect();
            width.set(rect.width)
            opacity.set(1)

            // Store initial offset between mouse and element
            setInitialOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })

            store_setIsDragging(true)
        }

        if (!(e.target instanceof HTMLElement)) return;

        if (store_target !== e.target.id) {
            store_setTarget(e.target.id)
        }

        if (!store_draggingTag || store_draggingTag.name !== tag.name) {
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
                className="z-50 relative"
                drag
                dragConstraints={elementConstraints}
                dragElastic={0.3}
                dragSnapToOrigin
                whileDrag={{ scale: 0.9, pointerEvents: "none", opacity: 0, transition: { duration: 0 } }}
                whileTap={{ scale: 0.9 }}
                dragTransition={{ bounceStiffness: 800, bounceDamping: 15 }}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                data-tag={JSON.stringify(tag)}
                whileHover="hover"
            >
                <Button className="w-[calc(100%_-_4px)] cursor-pointer">
                    {`<${tag.name}/>`}
                </Button>
            </motion.div>
            {typeof document !== 'undefined' && createPortal(
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
                document.body
            )}
        </>
    )

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            ref={ref}
                            className="z-50 relative"
                            drag
                            dragConstraints={elementConstraints}
                            dragElastic={0.3}
                            dragSnapToOrigin
                            whileDrag={{ scale: 0.9, pointerEvents: "none", opacity: 0, transition: { duration: 0 } }}
                            whileTap={{ scale: 0.9 }}
                            dragTransition={{ bounceStiffness: 800, bounceDamping: 15 }}
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                            data-tag={JSON.stringify(tag)}
                            whileHover="hover"
                        >
                            <Button className="w-[calc(100%_-_4px)] cursor-pointer">
                                {`<${tag.name}/>`}
                            </Button>
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="relative top-60 left-20 max-w-lg w-full">
                        <p>{tag.description}</p>
                    </TooltipContent>
                    {typeof document !== 'undefined' && createPortal(
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
                        document.body
                    )}
                </Tooltip>
            </TooltipProvider>
        </>
    );
}
export default TagItem;