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

function AttributesModal({ tag }: AttributesModalProps) {
  return (
    <Dialog>
      <form>
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
            {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default AttributesModal;
