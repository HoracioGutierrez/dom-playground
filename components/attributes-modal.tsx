import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import type { AttributesModalProps } from "@/lib/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState, type FormEvent } from "react";
import { useTags } from "@/stores/useTags";

function AttributesModal({ tag }: AttributesModalProps) {
  const [attributes, setAttributes] = useState(tag.attributes);
  const { updateTagAttributes, setAttributesModalOpen } = useTags();

  const handleInputChange = (name: string, value: string) => {
    setAttributes((prev) =>
      prev.map((attr) => (attr.name === name ? { ...attr, value } : attr)),
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(attributes);
    updateTagAttributes(tag.id, attributes);
    setAttributesModalOpen(false);
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Edit className="size-5 text-main-foreground/20 hover:text-main-foreground cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {`<${tag.name}/>`} attributes</DialogTitle>
            <DialogDescription>
              Edit the possible attributes for this tag.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {tag.attributes.length === 0 && (
              <p className="text-main-foreground/50 text-sm">
                No attributes available for this tag.
              </p>
            )}
            {attributes.map((attribute) => {
              return (
                <div className="grid gap-3" key={attribute.name}>
                  <Label htmlFor={attribute.name}>{attribute.name}</Label>
                  <Input
                    id={attribute.name}
                    name={attribute.name}
                    value={attribute.value}
                    onChange={(e) =>
                      handleInputChange(attribute.name, e.target.value)
                    }
                    placeholder={attribute.placeholder}
                  />
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default AttributesModal;
