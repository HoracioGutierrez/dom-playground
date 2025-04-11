import { Tag, useTagsProps } from "@/lib/types";
import { create } from "zustand";
import zukeeper from "zukeeper"

export const useTags = create<useTagsProps>(zukeeper((set: any) => ({
    children: [],
    target: "",
    isDragging: false,
    draggingTag: null,
    error: null,
    hoveredTarget: "",
    setChildren: (children: Tag[]) => set({ children }),
    setTarget: (target: string) => set({ target }),
    setIsDragging: (isDragging: boolean) => set({ isDragging }),
    setDraggingTag: (draggingTag: Tag | null) => set({ draggingTag }),
    setError: (error: string | null | React.ReactNode) => set({ error }),
    setHoveredTarget: (target: string) => set({ hoveredTarget: target })
})))