"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { T } from "gt-next";
import { useTags } from "@/stores/useTags";
import { generateHTML } from "@/lib/utils";
import { useMemo } from "react";
import { toast } from "sonner";

export function DOMPreview() {
  const { children: store_children } = useTags();

  const HTMLString = useMemo(() => {
    return store_children.map((tag) => generateHTML(tag)).join("\n");
  }, [store_children]);

  const copyToClipboard = () => {
    toast.promise(navigator.clipboard.writeText(HTMLString), {
      loading: "Copying to clipboard...",
      success: "Copied to clipboard!",
      error: "Failed to copy to clipboard!",
      className : "!bg-main !border-2 !border-border"
    });
  };

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
            <div className="border-dashed border-2 border-border bg-main/50 p-4 rounded-md text-foreground font-mono relative group">
              {store_children.length > 0 ? (
                <>
                  <Copy
                    className="absolute top-2 right-2 size-4 opacity-50 cursor-pointer"
                    onClick={copyToClipboard}
                  />
                  <pre className="whitespace-pre-wrap">{HTMLString}</pre>
                </>
              ) : (
                <p className="text-main-foreground/50">
                  You haven't dropped any tags yet!
                </p>
              )}
            </div>
          </T>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
