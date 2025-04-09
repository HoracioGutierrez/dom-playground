"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { TagItemProps } from "@/lib/types";
import { useTags } from "@/stores/useTags";

function TagItem({ elementConstraints, setIsDragging, isDragging, tag, setDraggingTag, setTarget, target }: TagItemProps) {

    const { setTarget: store_setTarget, target: store_target, isDragging: store_isDragging, setIsDragging: store_setIsDragging, setDraggingTag: store_setDraggingTag, draggingTag: store_draggingTag, setError } = useTags()

    const handleDrag = (e: PointerEvent) => {
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
    };

    return (
        <motion.div
            className="z-50"
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
                {`<${tag.name}/>`}
            </Button>
        </motion.div>
    );
}
export default TagItem;