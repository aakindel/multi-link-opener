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
import { PlusCircleIcon } from "lucide-react";
import type { NextPage } from "next";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const addLinkSetFormRef = useRef<HTMLFormElement>(null);
  const [showAddLinkSetDialog, setShowAddLinkSetDialog] = useState(false);

  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-6xl items-center px-4 pt-0 sm:px-8">
        <div className="flex h-[80%] w-full gap-4">
          <div className="flex h-full w-[300px] shrink-0 flex-col gap-2">
            <Dialog
              open={showAddLinkSetDialog}
              onOpenChange={setShowAddLinkSetDialog}
            >
              <DialogTrigger asChild>
                <Button className="gap-2">
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
            <Button variant="outline">(or prefill 5 demo link sets)</Button>
          </div>
          <div className="flex h-full w-full flex-1 rounded-md border"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
