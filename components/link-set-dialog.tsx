"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useLinkStore } from "../app/store";
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
import { AddLinkSetForm, EditLinkSetForm } from "@/components/link-set-form";
import { PlusCircleIcon } from "lucide-react";
import { LinkSetType } from "@/types";
import { cn } from "@/utils";

export function AddLinkSetDialog({
  showAddLinkSetDialog,
  setShowAddLinkSetDialog,
  addLinkSetFormRef,
  scrollAreaViewportRef,
  setActiveTab,
}: {
  showAddLinkSetDialog: boolean;
  setShowAddLinkSetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addLinkSetFormRef: React.RefObject<HTMLFormElement>;
  scrollAreaViewportRef: React.RefObject<HTMLDivElement>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Dialog open={showAddLinkSetDialog} onOpenChange={setShowAddLinkSetDialog}>
      <DialogTrigger asChild>
        <Button className="shrink-0 gap-2">
          <PlusCircleIcon className="h-5 w-5" />
          Add a Link Set
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-3 p-4">
        <DialogHeader className="mt-1 space-y-3">
          <DialogTitle>Add Link Set</DialogTitle>
          <DialogDescription>
            Name your link set and insert your web link(s) in the text area
            below. Click the Add Link Set button when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <AddLinkSetForm
            setActiveTab={setActiveTab}
            addLinkSetFormRef={addLinkSetFormRef}
            scrollAreaViewportRef={scrollAreaViewportRef}
            closeDialog={() => setShowAddLinkSetDialog(false)}
          />
        </div>
        <DialogFooter className="mt-1">
          <Button
            variant="outline"
            onClick={() => setShowAddLinkSetDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => addLinkSetFormRef.current?.requestSubmit()}
          >
            Add Link Set
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditLinkSetDialog({
  linkSet,
  showEditLinkSetDialog,
  setShowEditLinkSetDialog,
  editLinkSetFormRef,
}: {
  linkSet: LinkSetType | null;
  showEditLinkSetDialog: boolean;
  setShowEditLinkSetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  editLinkSetFormRef: React.RefObject<HTMLFormElement>;
}) {
  return (
    linkSet && (
      <Dialog
        open={showEditLinkSetDialog}
        onOpenChange={setShowEditLinkSetDialog}
      >
        <DialogContent className="gap-3 p-4">
          <DialogHeader className="mt-1 space-y-3">
            <DialogTitle>Edit Link Set</DialogTitle>
            <DialogDescription>
              Edit your link set name and link(s) below. Click the Save Changes
              button when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <EditLinkSetForm
              linkSet={linkSet}
              editLinkSetFormRef={editLinkSetFormRef}
              closeDialog={() => setShowEditLinkSetDialog(false)}
            />
          </div>
          <DialogFooter className="mt-1">
            <Button
              variant="outline"
              onClick={() => setShowEditLinkSetDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => editLinkSetFormRef.current?.requestSubmit()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}

export function DeleteLinkSetDialog({
  linkSet,
  showDeleteLinkSetDialog,
  setShowDeleteLinkSetDialog,
  activeTab,
  setActiveTab,
}: {
  linkSet: LinkSetType | null;
  showDeleteLinkSetDialog: boolean;
  setShowDeleteLinkSetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const addedLinkSets = useLinkStore((state) => state.addedLinkSets);
  const deleteLinkSet = useLinkStore((state) => state.deleteLinkSet);

  return (
    linkSet && (
      <Dialog
        open={showDeleteLinkSetDialog}
        onOpenChange={setShowDeleteLinkSetDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-1.5">Delete link set?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All the links you&apos;ve added to{" "}
              &ldquo;{linkSet.name}&rdquo; will no longer be accessible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-2 sm:mt-0"
              )}
            >
              Cancel
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                deleteLinkSet(linkSet);
                setShowDeleteLinkSetDialog(false);
                // change active tab if more than one link set & active tab is deleted
                if (addedLinkSets.length > 1 && linkSet.id === activeTab) {
                  const linkSetIndex = addedLinkSets.findIndex(
                    (addedLinkSet) => addedLinkSet.id === linkSet.id
                  );
                  linkSetIndex === addedLinkSets.length - 1
                    ? setActiveTab(addedLinkSets[linkSetIndex - 1].id)
                    : setActiveTab(addedLinkSets[linkSetIndex + 1].id);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
