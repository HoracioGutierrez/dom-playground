"use client"
import DroppableTagItem from "@/components/droppable-tag-item";
import { DropzoneProps } from "@/lib/types";
import { AnimatePresence, useAnimate } from "motion/react";
import * as motion from "motion/react-client"
import { useEffect } from "react";


function Dropzone({ isDragging, target, draggingTag, children, setChildren, setTarget }: DropzoneProps) {

    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (isDragging) {
            handleDragOverAnimation()
        }

        if (target !== "dropzone") {
            handleDragOverEndAnimation()
        }
    }, [isDragging, draggingTag, target])

    const handleDragOverAnimation = () => {
        if (!isDragging) return
        if (!draggingTag) return
        if (!target) return
        if (target !== "dropzone") return

        if (draggingTag.name === "html" && children.length > 0) {
            return animate(scope.current, { backgroundColor: "#ff6669" })
        }

        if (draggingTag.name !== "html" && children.length === 0) {
            return animate(scope.current, { backgroundColor: "#ff6669" })
        }

        if (draggingTag.name !== "html" && children.length >= 1) {
            return animate(scope.current, { backgroundColor: "#ff6669" })
        }

        animate(scope.current, { backgroundColor: "#00bd84" })
    }

    const handleDragOverEndAnimation = () => {
        animate(scope.current, { backgroundColor: "#ffffff00" })
    }

    const handleDropAnimation = () => {
        handleDragOverEndAnimation()

        if (!draggingTag) return

        if (draggingTag.name === "html" && children.length > 0) return

        if (draggingTag.name !== "html" && children.length === 0) return

        if (draggingTag.name !== "html" && children.length >= 1) return

        const newTag = {
            ...draggingTag,
            id: draggingTag.id + "-" + Math.random().toString(36).substring(2, 15)
        }
        setChildren([...children, newTag])
    }

    return (
        <motion.div
            ref={scope}
            id="dropzone"
            initial="initial"
            animate="animate"
            exit="exit"
            className="border-4 border-dashed rounded-base p-4 flex flex-col gap-2 z-0 border-border"
            //onMouseEnter={handleDragOverAnimation}
            onMouseLeave={handleDragOverEndAnimation}
            onMouseUp={handleDropAnimation}
        >
            <AnimatePresence>
                {children.map((tag) => {

                    return (
                        <DroppableTagItem
                            key={tag.id}
                            tag={tag}
                            elementConstraints={scope}
                            isDragging={isDragging}
                            setTarget={setTarget}
                            setChildren={setChildren}
                            children={children}
                            draggingTag={draggingTag}
                        />
                    )
                })}
            </AnimatePresence>
        </motion.div>
    )
}
export default Dropzone