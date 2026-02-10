"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTags } from "@/stores/useTags";
import { generateHTML, generateJSX } from "@/lib/utils";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Tag } from "@/types/tag";
import { Button } from "./ui/button";

export function DOMPreview() {
  const { children: store_children, setChildren } = useTags();
  const [isJSX, setIsJSX] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const previewString = useMemo(() => {
    return store_children
      .map((tag) => (isJSX ? generateJSX(tag) : generateHTML(tag)))
      .join("\n");
  }, [store_children, isJSX]);

  const transformHTMLToTag = (html: string): Tag[] => {
    // Strip markdown code fences if present
    const cleaned = html.replace(/```(?:html)?\n?/gi, "").trim();

    const parser = new DOMParser();
    const doc = parser.parseFromString(cleaned, "text/html");

    const transformElement = (element: Element): Tag => {
      const tag: Tag = {
        id: crypto.randomUUID(),
        name: element.tagName.toLowerCase(),
        hasChildren:
          element.children.length > 0 || element.textContent?.trim() !== "",
        children: [],
        possibleChildren: [],
        description: `A ${element.tagName.toLowerCase()} element`,
        attributes: Array.from(element.attributes).map((attr) => ({
          name: attr.name,
          value: attr.value,
          placeholder: `Enter ${attr.name}`,
          regex: /.*/,
        })),
      };

      for (const child of element.children) {
        tag.children.push(transformElement(child));
      }

      return tag;
    };

    // Check if the AI explicitly generated an <html> tag
    const hasExplicitHtml = /<html[\s>]/i.test(cleaned);

    if (hasExplicitHtml) {
      return [transformElement(doc.documentElement)];
    }

    // Otherwise extract only the actual content from body (DOMParser always wraps in html>head>body)
    return Array.from(doc.body.children).map(transformElement);
  };

  const handleGenerate = async (prompt: string) => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        result += chunk;
      }
      console.log("🚀 ~ handleGenerate ~ result:", result);

      // Transform the HTML string into Tag structures
      const newTags = transformHTMLToTag(result);
      setChildren(newTags);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate DOM structure");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    toast.promise(navigator.clipboard.writeText(previewString), {
      loading: "Copying to clipboard...",
      success: "Copied to clipboard!",
      error: "Failed to copy to clipboard!",
      className: "!bg-main !border-2 !border-border",
    });
  };

  const t = useTranslations("DOMPreview");

  return (
    <Card className="w-full min-w-xs">
      <CardHeader>
        <CardTitle>
          <h2 className="font-heading text-2xl">{t("title")}</h2>
        </CardTitle>
        <CardDescription>
          <p className="text-foreground/50 font-base mb-8">
            {t("description", { format: isJSX ? "JSX" : "HTML" })}
          </p>
          <div className="space-y-4 mb-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="ai-prompt">{t("aiPromptLabel")}</Label>
              <textarea
                id="ai-prompt"
                className="w-full h-32 p-2 rounded-md bg-secondary-background border border-border resize-none"
                placeholder={t("aiPromptPlaceholder")}
              />
              <Button
                onClick={() => {
                  const textarea = document.getElementById(
                    "ai-prompt",
                  ) as HTMLTextAreaElement;
                  handleGenerate(textarea.value);
                }}
                disabled={isGenerating}
                className="px-4 py-2 bg-main text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {isGenerating ? t("generating") : t("generateButton")}
              </Button>
            </div>
          </div>
          <hr className="my-4" />
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
                {t("emptyState")}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Switch
              id="preview-mode"
              checked={isJSX}
              onCheckedChange={setIsJSX}
              className="bg-secondary-background"
            />
            <Label htmlFor="preview-mode">{t("jsxPreviewLabel")}</Label>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
