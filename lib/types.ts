export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type TagItemProps = {
    elementConstraints: React.RefObject<null>;
    setIsDragging: (isDragging: boolean) => void;
    isDragging: boolean;
    tag: Tag;
    setDraggingTag: (tag: Tag | null) => void;
    setTarget: (htmlTag: string | null) => void;
    target: string | null;
};

export type DroppableTagItemProps = {
    elementConstraints: React.RefObject<null>;
    tag: Tag;
    isDragging: boolean;
    setTarget: (htmlTag: string | null) => void;
    setChildren: (children: Tag[]) => void;
    children: Tag[];
    draggingTag: Tag | null;
    target: string | null;
}

export type Tag = {
    id: string;
    name: string;
    hasChildren: boolean;
    children: Tag[];
    possibleChildren: PossibleChildren[];
}

export type PossibleChildren = {
    name: string;
    limit: number | null;
}

export type DropzoneProps = {
    isDragging: boolean;
    target: string | null;
    draggingTag: Tag | null;
    children: Tag[];
    setChildren: (children: Tag[]) => void;
    setTarget: (htmlTag: string | null) => void;
}

export type useTagsProps = {
    children : Tag[];
    target : string;
    isDragging : boolean;
    draggingTag : Tag | null;
    error : string | null | React.ReactNode;
    setChildren : (children: Tag[]) => void;
    setTarget : (target:string) => void;
    setIsDragging : (isDragging: boolean) => void;
    setDraggingTag : (draggingTag: Tag | null) => void;
    setError : (error: string | null | React.ReactNode) => void;
}