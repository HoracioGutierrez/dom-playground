import type { Tag, useTagsProps } from "@/lib/types";
import { create } from "zustand";

export const useTags = create<useTagsProps>((set) => ({
  children: [],
  target: "",
  isDragging: false,
  draggingTag: null,
  error: null,
  hoveredTarget: "",
  attributesModalOpen: false,
  attributesTag : null,
  setAttributesTag: (tag: Tag | null) => set({ attributesTag: tag }),
  setAttributesModalOpen: (open: boolean) => set({ attributesModalOpen: open }),
  setChildren: (children: Tag[]) => set({ children }),
  setTarget: (target: string) => set({ target }),
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
  setDraggingTag: (draggingTag: Tag | null) => set({ draggingTag }),
  setError: (error: string | null | React.ReactNode) => set({ error }),
  setHoveredTarget: (target: string) => set({ hoveredTarget: target }),
}));
