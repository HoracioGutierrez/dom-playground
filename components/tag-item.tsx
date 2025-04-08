"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { TagItemProps } from "@/lib/types";

function TagItem({ elementConstraints, setIsDragging, isDragging, tag, setDraggingTag }: TagItemProps) {

    const handleDrag = () => {
        if (!isDragging) {
            setIsDragging(true);
            setDraggingTag(tag);
        }
    };

    const handleDragEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            setDraggingTag(null);
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