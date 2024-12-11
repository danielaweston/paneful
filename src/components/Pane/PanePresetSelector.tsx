"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

import { cn, PANE_SIZE_VARIANTS } from "~/lib/utils";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { type PaneState } from "./Pane";

interface PanePresetSelectorProps {
  paneState: PaneState;
  setPaneState: (updatedState: PaneState) => void;
  disabled: boolean;
}

const PanePresetSelector = ({
  paneState,
  setPaneState,
  disabled,
}: PanePresetSelectorProps) => {
  const [open, setOpen] = useState(false);

  const useDeviceVariant = (value: keyof typeof PANE_SIZE_VARIANTS) => {
    const newPaneState = {
      ...paneState,
      paneSizeVariant: value,
    };

    const variant = PANE_SIZE_VARIANTS[value];

    if (variant) {
      newPaneState.width = variant.width;
      newPaneState.height = variant.height;
      newPaneState.preMinimizedHeight = variant.height;
    }

    setPaneState(newPaneState);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary-ghost"
          role="combobox"
          aria-label="Pane preset selector"
          aria-expanded={open}
          disabled={disabled}
          className="justify-start overflow-hidden p-0"
        >
          {PANE_SIZE_VARIANTS[paneState.paneSizeVariant]?.label ?? "Custom"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search devices..." className="h-9" />
          <CommandList>
            <CommandEmpty>No device found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(PANE_SIZE_VARIANTS).map(([key, value]) => (
                <CommandItem key={key} value={key} onSelect={useDeviceVariant}>
                  {value.label}
                  <FaCheck
                    className={cn(
                      "ml-auto",
                      key === paneState.paneSizeVariant
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { PanePresetSelector };
