"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { type IconType } from "react-icons";
import { FaLock, FaLockOpen, FaWindowMinimize } from "react-icons/fa";
import {
  FaArrowsRotate,
  FaGripVertical,
  FaMaximize,
  FaX,
} from "react-icons/fa6";

import { cn, PANE_TOOLBAR_HEIGHT_TAILWIND_CLASS } from "~/lib/utils";

import { Button, type ButtonProps } from "~/components/ui/button";

import { PaneResizeInput } from "./PaneResizeInput";
import { PanePresetSelector } from "./PanePresetSelector";
import { type PaneState } from "./Pane";

const PaneToolbarButton = ({
  Icon,
  ...rest
}: ButtonProps & { Icon: IconType }) => {
  return (
    <Button
      className="h-9 w-8 bg-transparent px-0 text-background-content opacity-80 shadow-none hover:opacity-100"
      {...rest}
    >
      <Icon size="18" />
    </Button>
  );
};

interface PaneToolbarProps {
  paneState: PaneState;
  setPaneState: (updatedState: PaneState) => void;
  deletePane: () => void;
}

const PaneToolbar = ({
  paneState,
  setPaneState,
  deletePane,
}: PaneToolbarProps) => {
  const [currentWidth, setCurrentWidth] = useState(paneState.width);
  const [currentHeight, setCurrentHeight] = useState(paneState.height);

  useEffect(() => {
    setCurrentWidth(paneState.width);
    setCurrentHeight(paneState.height);
  }, [paneState]);

  const { isLocked, isMinimized } = paneState;

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between rounded-t-md border-b-2 border-black bg-background-200 px-2 text-lg drop-shadow-lg hover:cursor-move",
        PANE_TOOLBAR_HEIGHT_TAILWIND_CLASS,
        "pane-toolbar",
      )}
    >
      <div className="flex max-w-[33.33%] flex-row items-center gap-2">
        <FaGripVertical className={cn(isLocked && "opacity-50")} />
        <PanePresetSelector
          paneState={paneState}
          setPaneState={setPaneState}
          disabled={isLocked}
        />
      </div>
      <div className="flex max-w-[33.33%] flex-row items-center gap-1">
        <PaneResizeInput
          aria-label="Pane width"
          value={currentWidth}
          disabled={isLocked || isMinimized}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (Number.isInteger(value) && value >= 0) {
              setCurrentWidth(value);
            }
          }}
          onBlur={() => {
            if (currentWidth !== paneState.width) {
              setPaneState({
                ...paneState,
                paneSizeVariant: "CUSTOM",
                width: currentWidth,
              });
            }
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              (e.target as HTMLElement).blur();
            }
          }}
        />
        <span className={cn(isLocked && "opacity-50")}>x</span>
        <PaneResizeInput
          aria-label="Pane height"
          value={isMinimized ? paneState.preMinimizedHeight : currentHeight}
          disabled={isLocked || isMinimized}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (Number.isInteger(value) && value >= 0) {
              setCurrentHeight(value);
            }
          }}
          onBlur={() => {
            if (currentHeight !== paneState.height) {
              setPaneState({
                ...paneState,
                paneSizeVariant: "CUSTOM",
                height: currentHeight,
                preMinimizedHeight: currentHeight,
              });
            }
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              (e.target as HTMLElement).blur();
            }
          }}
        />
      </div>
      <div className="flex max-w-[33.33%] flex-row items-center">
        {isLocked && (
          <PaneToolbarButton
            aria-label="Lock pane"
            Icon={FaLock}
            onClick={() => setPaneState({ ...paneState, isLocked: false })}
          />
        )}
        {!isLocked && (
          <PaneToolbarButton
            aria-label="Unlock pane"
            Icon={FaLockOpen}
            onClick={() => setPaneState({ ...paneState, isLocked: true })}
          />
        )}
        <PaneToolbarButton
          aria-label="Rotate pane"
          Icon={FaArrowsRotate}
          disabled={isLocked || isMinimized}
          onClick={() => {
            setPaneState({
              ...paneState,
              width: currentHeight,
              height: currentWidth,
              preMinimizedHeight: currentWidth,
            });
          }}
        />
        {isMinimized && (
          <PaneToolbarButton
            aria-label="Maximize pane"
            Icon={FaMaximize}
            disabled={isLocked}
            onClick={() => {
              setPaneState({
                ...paneState,
                height: paneState.preMinimizedHeight,
                isMinimized: false,
              });
            }}
          />
        )}
        {!isMinimized && (
          <PaneToolbarButton
            aria-label="Minimize pane"
            Icon={FaWindowMinimize}
            disabled={isLocked}
            onClick={() => {
              setPaneState({
                ...paneState,
                preMinimizedHeight: paneState.height,
                height: 0,
                isMinimized: true,
              });
            }}
          />
        )}
        <PaneToolbarButton
          aria-label="Delete pane"
          Icon={FaX}
          onClick={() => {
            deletePane();
          }}
        />
      </div>
    </div>
  );
};

export { PaneToolbar };
