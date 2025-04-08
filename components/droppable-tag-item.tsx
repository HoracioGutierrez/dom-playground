"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { DroppableTagItemProps } from "@/lib/types";
import { useAnimate } from "motion/react";

function DroppableTagItem({ elementConstraints, tag, isDragging, setTarget }: DroppableTagItemProps) {

    const [scope, animate] = useAnimate()

    const handleDrag = () => {
    };

    const handleDragEnd = () => {
    };

    const handleDragOverAnimation = (e:DragEvent) => {
        if (!isDragging) return

        if(e.target instanceof HTMLElement){
            setTarget(e.target.id)
        }

        animate(scope.current.children[0], { backgroundColor: "#00bd84" })
    }

    const handleDragOverEndAnimation = () => {
        if (!isDragging) return
        animate(scope.current.children[0], { backgroundColor: "#7a83ff" })
    }

    const handleDropAnimation = () => {
        handleDragOverEndAnimation()
    }

    return (
        <motion.div
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
            <Button className="w-[calc(100%_-_4px)] cursor-pointer">
                {tag.name}
            </Button>
        </motion.div>
    )
}
export default DroppableTagItem