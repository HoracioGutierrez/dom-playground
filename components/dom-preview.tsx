"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import * as motion from "motion/react-client";
import { T } from "gt-next";
import { useTags } from "@/stores/useTags";
import type { Tag } from "@/lib/types";

const generateHTML = (tag: Tag): string => {
  if (!tag.children || tag.children.length === 0) {
    return `<${tag.name}/>`;
  }
  
  const childrenHTML = tag.children
    .map(child => {
      const childContent = generateHTML(child)
        .split('\n')
        .map(line => `  ${line}`)
        .join('\n');
      return childContent;
    })
    .join('\n');

  return `<${tag.name}>\n${childrenHTML}\n</${tag.name}>`;
};

export function DOMPreview() {
  const { children: store_children } = useTags();

  return (
    <Card className="w-full min-w-xs">
      <CardHeader>
        <CardTitle>
          <T>
            <h2 className="font-heading text-2xl">The DOM</h2>
          </T>
        </CardTitle>
        <CardDescription>
          <T>
            <p className="text-foreground/50 font-base mb-8">
              The HTML code generated from the tags you have dropped.
            </p>
            {store_children.length > 0 ? (
              <div className="border-dashed border-2 border-border bg-main/50 p-4 rounded-md text-foreground font-mono relative group">
                {/* HTML String View */}
                <motion.div whileTap={{ scale: 0.8 }}>
                  <Copy className="absolute top-2 right-2 size-4 opacity-50" />
                </motion.div>
                <pre className="whitespace-pre-wrap">
                  {store_children
                    .map((tag) => generateHTML(tag))
                    .join("\n")}
                </pre>
              </div>
            ) : (
              <div className="border-dashed border-2 border-border bg-main/50 p-4 rounded-md text-foreground/50">
                <p>You haven't dropped any tags yet!</p>
              </div>
            )}
          </T>
        </CardDescription>
      </CardHeader>
    </Card>
  );
} 