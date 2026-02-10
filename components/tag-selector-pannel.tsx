"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TagItem from "@/components/tag-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tags } from "@/lib/tags";
import { useTags } from "@/stores/useTags";
import { useTranslations } from "next-intl";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

function TagSelectorPannel({ ref }: { ref: React.RefObject<null> }) {
  const { hoveredTarget } = useTags();
  const t = useTranslations("TagSelector");

  return (
    <Card className="w-full min-w-xs">
      <CardHeader>
        <CardTitle>
          <h2 className="font-heading text-2xl">{t("title")}</h2>
        </CardTitle>
        <CardDescription>
          <p className="text-foreground/50 font-base">
            {t("description")}
          </p>
        </CardDescription>
        <div className="relative">
          <ScrollArea
            className="rounded-base justify-center lg:h-[calc(100dvh_-_410px)] h-[200px] mt-8 w-full border-2 border-border border-dashed bg-main/20 p-4 grow z-50"
            id="scrollable"
          >
            <div className="flex lg:flex-col gap-4 flex-wrap">
              {tags.map((tag) => {
                return (
                  <TagItem key={tag.id} elementConstraints={ref} tag={tag} />
                );
              })}
            </div>
          </ScrollArea>
          <AnimatePresence>
            {hoveredTarget && (
              <motion.div
                className="absolute bottom-0 p-2 border-2 rounded-md w-full bg-secondary-background z-[1000]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {hoveredTarget}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardHeader>
    </Card>
  );
}
export default TagSelectorPannel;
