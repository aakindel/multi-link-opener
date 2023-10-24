"use client";

import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";
import { PenSquareIcon, PlayIcon, Trash2Icon } from "lucide-react";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { useLinkStore } from "./store";
import { prefillLinks } from "./data";
import { LinkSetType } from "@/types";
import {
  AddLinkSetDialog,
  EditLinkSetDialog,
  DeleteLinkSetDialog,
} from "@/components/link-set-dialog";
import { TooltipIconButton } from "@/components/tooltip-icon-button";
import { EnablePopUpsAlert } from "@/components/enable-pop-ups-alert";

const Home: NextPage = () => {
  const addedLinkSets = useLinkStore((state) => state.addedLinkSets);
  const setAddedLinkSets = useLinkStore((state) => state.setAddedLinkSets);
  const [activeTab, setActiveTab] = useState(
    addedLinkSets.length ? addedLinkSets[0].id : ""
  );
  const [userHasClosedAlert, setUserHasClosedAlert] = useState<boolean>(false);
  const [shouldShowEnablePopUpsAlert, setShouldShowEnablePopUpsAlert] =
    useState<boolean>(false);

  const addLinkSetFormRef = useRef<HTMLFormElement>(null);
  const [showAddLinkSetDialog, setShowAddLinkSetDialog] = useState(false);

  const editLinkSetFormRef = useRef<HTMLFormElement>(null);
  const [showEditLinkSetDialog, setShowEditLinkSetDialog] = useState(false);
  const [editingLinkset, setEditingLinkset] = useState<LinkSetType | null>(
    null
  );

  const [showDeleteLinkSetDialog, setShowDeleteLinkSetDialog] = useState(false);
  const [deletingLinkset, setDeletingLinkset] = useState<LinkSetType | null>(
    null
  );

  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-6xl items-center px-4 pt-0 sm:px-8">
        <Tabs
          className="flex h-full w-full flex-col items-center justify-center"
          orientation="vertical"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
          }}
        >
          {shouldShowEnablePopUpsAlert && !userHasClosedAlert && (
            <EnablePopUpsAlert
              setShouldShowEnablePopUpsAlert={setShouldShowEnablePopUpsAlert}
              setUserHasClosedAlert={setUserHasClosedAlert}
            />
          )}
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
              <DeleteLinkSetDialog
                linkSet={deletingLinkset}
                showDeleteLinkSetDialog={showDeleteLinkSetDialog}
                setShowDeleteLinkSetDialog={setShowDeleteLinkSetDialog}
                setActiveTab={setActiveTab}
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
                              <TooltipIconButton
                                icon={<PlayIcon className="h-4 w-4 stroke-2" />}
                                tooltipText="Open Link Set"
                                onClick={() => {
                                  if (typeof window !== "undefined") {
                                    for (const link of addedLinkSet.links) {
                                      window?.open(link, "_blank")?.focus();
                                    }
                                  }
                                  setShouldShowEnablePopUpsAlert(true);
                                }}
                              />
                              <TooltipIconButton
                                icon={
                                  <PenSquareIcon className="h-4 w-4 stroke-2" />
                                }
                                tooltipText="Edit Link Set"
                                onClick={() => {
                                  setEditingLinkset(addedLinkSet);
                                  setShowEditLinkSetDialog(true);
                                }}
                              />
                              <TooltipIconButton
                                icon={
                                  <Trash2Icon className="h-4 w-4 stroke-2" />
                                }
                                tooltipText="Delete Link Set"
                                onClick={() => {
                                  setDeletingLinkset(addedLinkSet);
                                  setShowDeleteLinkSetDialog(true);
                                }}
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
