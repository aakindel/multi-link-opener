"use client";

import Link from "next/link";
import { useState } from "react";
import { DeleteAllLinkSetsDialog } from "./link-set-dialog";
import PageDropdown from "./page-dropdown";

export function MainNav() {
  const [showDeleteAllLinkSetsDialog, setShowDeleteAllLinkSetsDialog] =
    useState(false);

  return (
    <header className="w-full border-b bg-white dark:bg-neutral-950">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          className="text-base font-medium text-neutral-950 dark:text-neutral-50"
        >
          Multi Link Opener
        </Link>
        <div className="flex items-center">
          <PageDropdown
            setShowDeleteAllLinkSetsDialog={setShowDeleteAllLinkSetsDialog}
          />
          <DeleteAllLinkSetsDialog
            showDeleteAllLinkSetsDialog={showDeleteAllLinkSetsDialog}
            setShowDeleteAllLinkSetsDialog={setShowDeleteAllLinkSetsDialog}
          />
        </div>
      </div>
    </header>
  );
}
