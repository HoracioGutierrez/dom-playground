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
import { generateHTML, generateJSX } from "@/lib/utils";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function DOMPreview() {
  const { children: store_children } = useTags();
  const [isJSX, setIsJSX] = useState(false);

  const previewString = useMemo(() => {
    return store_children.map((tag) => isJSX ? generateJSX(tag) : generateHTML(tag)).join("\n");
  }, [store_children, isJSX]);

  const copyToClipboard = () => {
    toast.promise(navigator.clipboard.writeText(previewString), {
      loading: "Copying to clipboard...",
      success: "Copied to clipboard!",
      error: "Failed to copy to clipboard!",
      className: "!bg-main !border-2 !border-border",
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
              The {isJSX ? "JSX" : "HTML"} code generated from the tags you have dropped.
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="preview-mode"
                checked={isJSX}
                onCheckedChange={setIsJSX}
              />
              <Label htmlFor="preview-mode">JSX Preview</Label>
            </div>
            <div className="border-dashed border-2 border-border bg-main/50 p-4 rounded-md text-foreground relative group">
              {store_children.length > 0 ? (
                <>
                  <Copy
                    className="absolute top-2 right-2 size-4 opacity-50 cursor-pointer"
                    onClick={copyToClipboard}
                  />
                  <pre className="whitespace-pre-wrap font-mono">
                    {previewString}
                  </pre>
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
