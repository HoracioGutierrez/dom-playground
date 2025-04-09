"use client"
import DroppableTagItem from "@/components/droppable-tag-item";
import { DropzoneProps } from "@/lib/types";
import { useTags } from "@/stores/useTags";
import { T } from "gt-next";
import { ArrowBigDown, Info } from "lucide-react";
import { AnimatePresence, useAnimate } from "motion/react";
import * as motion from "motion/react-client"
import { useEffect } from "react";


function Dropzone({ isDragging, target, draggingTag, children, setChildren, setTarget }: DropzoneProps) {

    const [scope, animate] = useAnimate()
    const { draggingTag: store_draggingTag, target: store_target, isDragging: store_isDragging, children: store_children, setChildren: store_setChildren, error } = useTags()

    useEffect(() => {
        if (store_isDragging && store_target === "dropzone") {
            handleDragOverAnimation()
        }

        if (store_isDragging && store_target !== "dropzone") {
            handleDragOverEndAnimation()
        }

        if (!store_isDragging) {
            handleDragOverEndAnimation()
        }
    }, [store_isDragging, store_target])

    const handleDragOverAnimation = () => {
        if (!store_isDragging) return
        if (!store_draggingTag) return
        if (!store_target) return
        if (store_target !== "dropzone") return

        //These add the red background to the dropzone
        if (store_draggingTag.name !== "html" && store_children.length === 0) {
            return animate(scope.current, { backgroundColor: "#ff6669" })
        }

        if (store_draggingTag.name === "html" && store_children.length > 0) {
            return animate(scope.current, { backgroundColor: "#ff6669" })
        }

        if (store_draggingTag.name !== "html" && store_children.length >= 1) {
            return animate(scope.current, { backgroundColor: "#ff6669" })
        }

        //This adds the green background to the dropzone
        animate(scope.current, { backgroundColor: "#00bd84" })
    }

    const handleDragOverEndAnimation = () => {
        //This returns the background to transparent
        animate(scope.current, { backgroundColor: "#7a83ff33" })
    }

    const handleDropAnimation = () => {
        handleDragOverEndAnimation()

        if (!store_draggingTag) return

        if (store_draggingTag.name === "html" && store_children.length > 0) return

        if (store_draggingTag.name !== "html" && store_children.length === 0) return

        if (store_draggingTag.name !== "html" && store_children.length >= 1) return

        const newTag = {
            ...store_draggingTag,
            id: store_draggingTag.id + "-" + Math.random().toString(36).substring(2, 15)
        }

        store_setChildren([...children, newTag])
    }

    return (
        <motion.div
            ref={scope}
            id="dropzone"
            initial="initial"
            animate="animate"
            exit="exit"
            className="border-2 border-dashed rounded-base p-4 flex flex-col gap-2 z-0 border-border bg-main/20 relative"
            //onMouseEnter={handleDragOverAnimation}
            //onMouseLeave={handleDragOverEndAnimation}
            onMouseUp={handleDropAnimation}
        >
            <AnimatePresence>
                {store_children.map((tag) => {

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
                            target={target}
                        />
                    )
                })}
                {store_children.length === 0 && (
                    <motion.div
                        variants={{
                            initial: { opacity: 0, x: 50 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: 50 }
                        }}
                        className="rounded-base p-2 text-lg font-bold text-foreground/50 w-full grow flex justify-center items-center pointer-events-none max-w-2xs flex-col gap-2 text-center mx-auto"
                    >
                        <motion.div initial={{ y: -50 }} animate={{ y: 0, transition: { repeat: Infinity, repeatType: "reverse", bounce: 0.35, duration : 0.8} }}>
                            <ArrowBigDown className="size-10" />
                        </motion.div>
                        Click and drag one of the tags to the left and drop it here to start building
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        variants={{
                            initial: { opacity: 0, x: 50 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: 50 }
                        }}
                        className="pointer-events-none absolute bg-[#ff6669]/50 h-auto p-2 border-4 rounded-md bottom-4 left-4 right-4 flex gap-2 items-center justify-center animate-pulse"
                    >
                        <T>
                            {error} <Info />
                        </T>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
export default Dropzone