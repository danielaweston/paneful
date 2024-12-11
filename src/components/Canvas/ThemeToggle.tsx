"use client";

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label="Toggle theme"
          variant="secondary-outline"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        >
          <IoSunnyOutline
            size="20"
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <IoMoonOutline
            size="20"
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Change Theme</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { ThemeToggle };
