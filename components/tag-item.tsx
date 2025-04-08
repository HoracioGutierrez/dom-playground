"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { TagItemProps } from "@/lib/types";

function TagItem({ elementConstraints, setIsDragging, isDragging, tag, setDraggingTag, setTarget, target }: TagItemProps) {

    const handleDrag = (e: DragEvent) => {

        if (e.target instanceof HTMLElement === false) return

        if (isDragging && (target === null || target !== e.target.id)) {
            if (e.target instanceof HTMLElement) {
                setTarget(e.target.id)
            }
        }

        if (!isDragging) {
            setIsDragging(true);
            setDraggingTag(tag);
        }
    };

    const handleDragEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            setDraggingTag(null);
            setTarget(null);
        }
    };

    return (
        <motion.div
            drag
            dragConstraints={elementConstraints}
            dragElastic={0.3}
            dragSnapToOrigin
            whileDrag={{ scale: 0.9, pointerEvents: "none" }}
            whileTap={{ scale: 0.9 }}
            dragTransition={{ bounceDamping: 15, bounceStiffness: 800 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            data-tag={JSON.stringify(tag)}
        >
            <Button className="w-[calc(100%_-_4px)] cursor-pointer">
                {tag.name}
            </Button>
        </motion.div>
    );
}
export default TagItem;