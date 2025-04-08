export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>

export type TagItemProps = {
    elementConstraints: React.RefObject<null>;
    setIsDragging: (isDragging: boolean) => void;
    isDragging: boolean;
    tag: Tag;
    setDraggingTag: (tag: Tag | null) => void;
};

export type Tag = {
    id: string;
    name: string;
    hasChildren: boolean; 
    children : Tag[];
    possibleChildren: PossibleChildren[];
}

export type PossibleChildren = {
    name: string;
    limit: number | null; 
}