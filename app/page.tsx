"use client";

import { AddLinkSetForm, EditLinkSetForm } from "@/components/link-set-form";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";
import {
  PenSquareIcon,
  PlayIcon,
  PlusCircleIcon,
  Trash2Icon,
} from "lucide-react";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { useLinkStore } from "./store";
import { prefillLinks } from "./data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkSetType } from "@/types";

const TooltipButton = ({
  icon,
  tooltipText,
  onClick,
}: {
  icon: React.ReactNode;
  tooltipText: string;
  onClick?: () => void;
}) => {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="pointer-events-auto h-6 w-6 shrink-0 hover:bg-neutral-300/80 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
            size="icon"
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="mb-0.5 animate-none select-none px-2 py-1 text-xs shadow-sm duration-0 data-[state=closed]:animate-none data-[state=closed]:duration-0 data-[state=closed]:fade-out-100 data-[state=closed]:zoom-out-100 data-[side=top]:slide-in-from-bottom-0 dark:bg-neutral-950">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const AddLinkSetDialog = ({
  showAddLinkSetDialog,
  setShowAddLinkSetDialog,
  addLinkSetFormRef,
}: {
  showAddLinkSetDialog: boolean;
  setShowAddLinkSetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addLinkSetFormRef: React.RefObject<HTMLFormElement>;
}) => {
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
            addLinkSetFormRef={addLinkSetFormRef}
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
};

const EditLinkSetDialog = ({
  linkSet,
  showEditLinkSetDialog,
  setShowEditLinkSetDialog,
  editLinkSetFormRef,
}: {
  linkSet: LinkSetType | null;
  showEditLinkSetDialog: boolean;
  setShowEditLinkSetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  editLinkSetFormRef: React.RefObject<HTMLFormElement>;
}) => {
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
};

const Home: NextPage = () => {
  const addedLinkSets = useLinkStore((state) => state.addedLinkSets);
  const setAddedLinkSets = useLinkStore((state) => state.setAddedLinkSets);
  const [activeTab, setActiveTab] = useState(
    addedLinkSets.length ? addedLinkSets[0].id : ""
  );

  const addLinkSetFormRef = useRef<HTMLFormElement>(null);
  const [showAddLinkSetDialog, setShowAddLinkSetDialog] = useState(false);

  const editLinkSetFormRef = useRef<HTMLFormElement>(null);
  const [editingLinkset, setEditingLinkset] = useState<LinkSetType | null>(
    null
  );
  const [showEditLinkSetDialog, setShowEditLinkSetDialog] = useState(false);

  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-6xl items-center px-4 pt-0 sm:px-8">
        <Tabs
          className="flex h-full w-full items-center justify-center"
          orientation="vertical"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
          }}
        >
          <div className="flex h-[80%] w-full gap-4">
            <div className="flex h-full w-[300px] shrink-0 flex-col gap-2">
              <AddLinkSetDialog
                showAddLinkSetDialog={showAddLinkSetDialog}
                setShowAddLinkSetDialog={setShowAddLinkSetDialog}
                addLinkSetFormRef={addLinkSetFormRef}
              />
              <EditLinkSetDialog
                linkSet={editingLinkset}
                showEditLinkSetDialog={showEditLinkSetDialog}
                setShowEditLinkSetDialog={setShowEditLinkSetDialog}
                editLinkSetFormRef={editLinkSetFormRef}
              />
              {!addedLinkSets.length && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddedLinkSets([...prefillLinks]);
                    setActiveTab(prefillLinks[0].id);
                  }}
                >
                  (or prefill 5 demo link sets)
                </Button>
              )}
              {addedLinkSets.length ? (
                <ScrollArea className="h-full rounded-md border">
                  {
                    <TabsList
                      className={cn(
                        "flex h-auto w-full flex-col justify-start gap-2 overflow-y-hidden overflow-x-scroll rounded-none bg-white p-0 dark:bg-neutral-950"
                      )}
                    >
                      {addedLinkSets.map((addedLinkSet, index) => {
                        return (
                          <div
                            className={cn(
                              "group/trigger relative flex h-full w-full max-w-[300px] items-center justify-start gap-1 rounded-none border-x-0 border-b-0 border-t-0 border-solid border-b-transparent bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-500 shadow-none transition-none hover:bg-neutral-200/60 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800",
                              activeTab === addedLinkSet.id &&
                                "bg-neutral-200/60 text-neutral-950 shadow-none dark:bg-neutral-800"
                            )}
                            key={index}
                          >
                            <TabsTrigger
                              className={cn(
                                "absolute bottom-0 left-0 right-0 top-0 z-0 flex h-full w-full bg-transparent data-[state=active]:bg-transparent dark:bg-transparent dark:data-[state=active]:bg-transparent"
                              )}
                              value={addedLinkSet.id}
                              title={addedLinkSet.name}
                            ></TabsTrigger>
                            <span className="pointer-events-none z-10 w-full overflow-hidden text-ellipsis whitespace-nowrap text-left leading-6">
                              {addedLinkSet.name}
                            </span>
                            <div className="pointer-events-none z-10 hidden gap-1 group-focus-within/trigger:flex group-hover/trigger:flex">
                              <TooltipButton
                                icon={<PlayIcon className="h-4 w-4 stroke-2" />}
                                tooltipText="Open Link Set"
                              />
                              <TooltipButton
                                icon={
                                  <PenSquareIcon className="h-4 w-4 stroke-2" />
                                }
                                tooltipText="Edit Link Set"
                                onClick={() => {
                                  setEditingLinkset(addedLinkSet);
                                  setShowEditLinkSetDialog(true);
                                }}
                              />
                              <TooltipButton
                                icon={
                                  <Trash2Icon className="h-4 w-4 stroke-2" />
                                }
                                tooltipText="Delete Link Set"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </TabsList>
                  }
                </ScrollArea>
              ) : (
                <></>
              )}
            </div>
            <div className="flex h-full w-full flex-1 overflow-hidden rounded-md border">
              {addedLinkSets.map((addedLinkSet, index) => {
                return (
                  <TabsContent
                    className={cn(
                      "mt-0 block h-full w-full",
                      activeTab !== addedLinkSet.id && "hidden"
                    )}
                    key={index}
                    value={addedLinkSet.id}
                  >
                    <div className="w-full bg-neutral-200/50 px-3 py-1 text-sm dark:bg-neutral-800/60">
                      {addedLinkSet.name}
                    </div>
                    <div className="w-full px-3 py-2">
                      {addedLinkSet.links.map((linkSet, index) => {
                        return (
                          <span
                            className="block text-sm text-neutral-900 dark:text-neutral-200"
                            key={index}
                          >
                            {linkSet}
                          </span>
                        );
                      })}
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
