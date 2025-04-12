import type { Attribute, Tag, useTagsProps } from "@/lib/types";
import { create } from "zustand";

export const useTags = create<useTagsProps>((set, get) => ({
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
  updateTagAttributes: (tagId: string, attributes: Attribute[]) => {
    console.log("🚀 ~ attributes:", attributes)
    const { children } = get();
    
    // Helper function to recursively update attributes in the children tree
    const updateAttributes = (tags: Tag[]): Tag[] => {
      return tags.map((tag) => {
        if (tag.id === tagId) {
          return { ...tag, attributes };
        }
        
        if (tag.children && tag.children.length > 0) {
          return { ...tag, children: updateAttributes(tag.children) };
        }
        
        return tag;
      });
    };
    
    const updatedChildren = updateAttributes(children);
    set({ children: updatedChildren });
  },
}));
