"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { TagItemProps } from "@/lib/types";

function TagItem({ elementConstraints, setIsDragging, isDragging, tag }: TagItemProps) {

    const handleDrag = (e: DragEvent) => {
        if (!isDragging) {
            setIsDragging(true);

        }
    };

    const handleDragEnd = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    return (
        <motion.div
            drag
            dragConstraints={elementConstraints}
            dragElastic={0.1}
            dragSnapToOrigin
            whileDrag={{ scale: 0.9, pointerEvents: "none" }}
            whileTap={{ scale: 0.9 }}
            dragTransition={{ bounceDamping: 15, bounceStiffness: 800 }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            <Button className="w-[calc(100%_-_4px)]">
                {tag.name}
            </Button>
        </motion.div>
    );
}
export default TagItem;