"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn, type PANE_SIZE_VARIANTS } from "~/lib/utils";

import { type CanvasState } from "~/components/Canvas/Canvas";

import { PaneWrapper } from "./PaneWrapper";
import { PaneToolbar } from "./PaneToolbar";

export interface PaneState {
  id: string;
  width: number;
  height: number;
  preMinimizedHeight: number;
  paneSizeVariant: keyof typeof PANE_SIZE_VARIANTS;
  x: number;
  y: number;
  z: number;
  isLocked: boolean;
  isMoving: boolean;
  isResizing: boolean;
  isMinimized: boolean;
}

export interface PaneProps {
  paneId: string;
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  popinDelay?: number;
}

const Pane = ({
  paneId,
  popinDelay = 0,
  canvasState,
  setCanvasState,
}: PaneProps) => {
  const [debouncedSourceUrl, setDebouncedSourceUrl] = useState("");

  useEffect(() => {
    if (canvasState.sourceUrl !== debouncedSourceUrl) {
      const updateDebounce = setTimeout(() => {
        setDebouncedSourceUrl(canvasState.sourceUrl);
      }, 500);

      return () => clearTimeout(updateDebounce);
    }
  }, [canvasState]);

  const paneState = canvasState.panes.find((pane) => pane.id === paneId);

  if (!paneState) {
    return null;
  }

  const setPaneState = (updatedState: PaneState) => {
    const maxZ = canvasState.panes.length;

    const newPanes = canvasState.panes.map((pane) => {
      if (pane.id === updatedState.id) {
        return { ...pane, ...updatedState, z: maxZ };
      } else {
        if (pane.z >= updatedState.z) {
          return { ...pane, z: pane.z - 1 };
        }
        return pane;
      }
    });

    setCanvasState({
      ...canvasState,
      panes: newPanes,
    });
  };

  const deletePane = () => {
    setCanvasState({
      ...canvasState,
      panes: canvasState.panes.filter((pane) => pane.id !== paneState.id),
    });
  };

  return (
    <PaneWrapper
      scale={canvasState.scale}
      paneState={paneState}
      setPaneState={setPaneState}
    >
      <motion.div
        className="flex h-full w-full flex-col overflow-auto rounded-md border-2 border-black bg-background shadow-md dark:border-neutral-800"
        initial={{
          scale: 0,
          opacity: 0,
          filter: "blur(4px)",
        }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        }}
        exit={{
          scale: 0,
          opacity: 0,
          filter: "blur(4px)",
        }}
        transition={{
          type: "spring",
          delay: popinDelay,
          duration: 0.5,
          bounce: 0,
        }}
      >
        <PaneToolbar
          paneState={paneState}
          setPaneState={setPaneState}
          deletePane={deletePane}
        />
        <div className="h-full w-full">
          <div
            className={cn(
              "absolute h-full w-full opacity-0",
              canvasState.isDisabled && "-z-10",
            )}
          />
          <iframe
            className={cn(
              "h-full w-full rounded-b-md",
              paneState.isMinimized && "hidden",
            )}
            src={debouncedSourceUrl !== "" ? debouncedSourceUrl : undefined}
            title="Pane"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </PaneWrapper>
  );
};

export { Pane };
