"use client";

import LinkSetForm from "@/components/link-set-form";
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
import { PlusCircleIcon } from "lucide-react";
import type { NextPage } from "next";
import { useRef, useState } from "react";
import { useLinkStore } from "./store";

const Home: NextPage = () => {
  const addedLinkSets = useLinkStore((state) => state.addedLinkSets);
  const [activeTab, setActiveTab] = useState(
    addedLinkSets.length ? addedLinkSets[0].id : ""
  );
  const addLinkSetFormRef = useRef<HTMLFormElement>(null);
  const [showAddLinkSetDialog, setShowAddLinkSetDialog] = useState(false);

  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-6xl items-center px-4 pt-0 sm:px-8">
        <Tabs
          className="flex h-full w-full items-center justify-center"
          defaultValue={"key"}
          orientation="vertical"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
          }}
        >
          <div className="flex h-[80%] w-full gap-4">
            <div className="flex h-full w-[300px] shrink-0 flex-col gap-2">
              <Dialog
                open={showAddLinkSetDialog}
                onOpenChange={setShowAddLinkSetDialog}
              >
                <DialogTrigger asChild>
                  <Button className="shrink-0 gap-2">
                    <PlusCircleIcon className="h-5 w-5" />
                    Add a Link Set
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-96 gap-3 p-4">
                  <DialogHeader className="mt-1 space-y-3">
                    <DialogTitle>Add Link Set</DialogTitle>
                    <DialogDescription>
                      Name your link set and insert your web link(s) in the text
                      area below. Click the Add Link Set button when you&apos;re
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <LinkSetForm
                      addLinkSetFormRef={addLinkSetFormRef}
                      closeDialog={() => setShowAddLinkSetDialog(false)}
                    />
                  </div>
                  <DialogFooter className="mt-1 sm:space-x-2.5">
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
              {!addedLinkSets.length && (
                <Button variant="outline">(or prefill 5 demo link sets)</Button>
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
                          <TabsTrigger
                            className={cn(
                              "group/trigger relative h-full w-full justify-start rounded-none border-x-0 border-b-0 border-t-0 border-solid border-b-transparent bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-500 shadow-none transition-none hover:bg-neutral-200/60 data-[state=active]:bg-neutral-200/60 data-[state=active]:text-neutral-950 data-[state=active]:shadow-none dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:data-[state=active]:bg-neutral-800"
                            )}
                            key={index}
                            value={addedLinkSet.id}
                            title={addedLinkSet.name}
                          >
                            {addedLinkSet.name}
                          </TabsTrigger>
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
