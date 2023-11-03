"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ThemeChangerSwitch } from "@/components/theme-changer";
import { useLinkStore } from "@/app/store";

export default function PageDropdown({
  setShowDeleteAllLinkSetsDialog,
}: {
  setShowDeleteAllLinkSetsDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const addedLinkSets = useLinkStore((state) => state.addedLinkSets);
  const { resolvedTheme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(resolvedTheme === "dark");

  const changeTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center p-[6px] text-neutral-900 transition-none hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800"
        >
          <span className="sr-only">Actions</span>
          <EllipsisHorizontalIcon className="h-6 w-6 stroke-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex cursor-pointer items-center space-x-16"
          onSelect={(e) => {
            e.preventDefault();
            changeTheme();
          }}
        >
          <span>Dark mode</span>
          <ThemeChangerSwitch
            isDarkMode={isDarkMode}
            changeTheme={changeTheme}
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!addedLinkSets.length}
          className="cursor-pointer"
          onSelect={() => setShowDeleteAllLinkSetsDialog(true)}
        >
          <TrashIcon className="mr-2.5 h-4 w-4 stroke-2 text-neutral-600" />
          Delete all link sets
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1 px-2 py-1.5 text-xs text-neutral-500">
          <span className="block">Link Sets: {addedLinkSets.length}</span>
          <span className="block">
            Web Links:{" "}
            {addedLinkSets
              .map((addedLinkSet) => addedLinkSet.links.length)
              .reduce((a, b) => a + b, 0)}
          </span>
        </div>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1 px-2 py-1.5 text-xs text-neutral-500">
          <span className="block">Remember to enable popups!</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
