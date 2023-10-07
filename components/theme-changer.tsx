"use client";

import React from "react";
import { useTheme } from "next-themes";
import useHasWindow from "@/hooks/useHasWindow";
import { Button } from "./ui/button";
import { Icons } from "./icons";

const ThemeChanger = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const hasWindow = useHasWindow();

  const changeTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return hasWindow ? (
    <React.Fragment>
      {resolvedTheme === "light" ? (
        <Button
          variant="ghost"
          className="h-9 w-9"
          size="icon"
          onClick={changeTheme}
        >
          <Icons.sun className="mt-px h-[1.2rem] w-[1.2rem]" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="h-9 w-9"
          size="icon"
          onClick={changeTheme}
        >
          <Icons.moon className="absolute mt-px h-[1.2rem] w-[1.2rem]" />
        </Button>
      )}
    </React.Fragment>
  ) : (
    <div className="h-9 w-9 px-0"></div>
  );
};

export default ThemeChanger;
