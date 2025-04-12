export type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export type TagItemProps = {
  elementConstraints: React.RefObject<null>;
  tag: Tag;
};

export type DroppableTagItemProps = {
  elementConstraints: React.RefObject<null>;
  tag: Tag;
};

export type Tag = {
  id: string;
  name: string;
  hasChildren: boolean;
  children: Tag[];
  possibleChildren: PossibleChildren[];
  description: string;
  attributes: Attribute[];
};

export type Attribute = {
  name: string;
  value: string;
  placeholder: string;
  regex: RegExp;
};

export type PossibleChildren = {
  name: string;
  limit: number | null;
};

export type DropzoneProps = {
  isDragging: boolean;
  target: string | null;
  draggingTag: Tag | null;
  children: Tag[];
  setChildren: (children: Tag[]) => void;
  setTarget: (htmlTag: string | null) => void;
};

export type useTagsProps = {
  children: Tag[];
  target: string;
  isDragging: boolean;
  draggingTag: Tag | null;
  error: string | null | React.ReactNode;
  hoveredTarget: string | null;
  attributesModalOpen: boolean;
  attributesTag: Tag | null;
  setAttributesTag: (tag: Tag | null) => void;
  setAttributesModalOpen: (open: boolean) => void;
  setChildren: (children: Tag[]) => void;
  setTarget: (target: string) => void;
  setHoveredTarget: (target: string) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDraggingTag: (draggingTag: Tag | null) => void;
  setError: (error: string | null | React.ReactNode) => void;
  updateTagAttributes: (tagId: string, attributes: Attribute[]) => void;
};

export type AttributesModalProps = {
  tag: Tag;
};
