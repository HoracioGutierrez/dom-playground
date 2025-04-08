"use client";
import * as motion from "motion/react-client";
import { Button } from "./ui/button";
import { T } from "gt-next";


type TagItemProps = {
  elementConstraints: React.RefObject<null>;
  setIsDragging: (isDragging: boolean) => void;
  isDragging: boolean;
};

function TagItem({ elementConstraints: ref, setIsDragging, isDragging }: TagItemProps) {

  return (<T id="components.tag_item.0">
    <motion.div drag dragConstraints={ref} dragElastic={0.1} dragSnapToOrigin whileDrag={{ scale: 0.9, pointerEvents: "none" }} whileTap={{ scale: 0.9 }} dragTransition={{ bounceDamping: 15, bounceStiffness: 800 }} onDrag={() => {
      if (!isDragging) {
        setIsDragging(true);
      }
    }} onDragEnd={() => {
      if (isDragging) {
        setIsDragging(false);
      }
    }}>
            <Button className="w-[calc(100%_-_4px)]">click</Button>
        </motion.div></T>
  );
}
export default TagItem;