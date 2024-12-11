"use client";

import { type RefObject } from "react";
import { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import { TbDeviceMobilePlus } from "react-icons/tb";
import { VscDebugRestart } from "react-icons/vsc";
import { toast } from "sonner";

import { CANVAS_STATE_DEFAULT } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { type CanvasState } from "./Canvas";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "motion/react";

export interface MenuProps {
  canvasRef: RefObject<ReactZoomPanPinchContentRef>;
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
}

const Menu = ({ canvasRef, canvasState, setCanvasState }: MenuProps) => {
  const onClickCreateNewPane = () => {
    const newPane = {
      id: crypto.randomUUID(),
      width: 800,
      height: 600,
      preMinimizedHeight: 600,
      paneSizeVariant: "CUSTOM",
      x: (-canvasState.x + 305) / canvasState.scale,
      y: (-canvasState.y + 120) / canvasState.scale,
      z: 0,
      isLocked: false,
      isMoving: false,
      isResizing: false,
      isMinimized: false,
    };

    const newPanes = [...canvasState.panes, newPane];

    setCanvasState({
      ...canvasState,
      panes: newPanes,
    });
  };

  const onClickResetCanvas = () => {
    // Updating the x, y and scale via state doesn't work as expected
    setCanvasState({
      ...canvasState,
      sourceUrl: CANVAS_STATE_DEFAULT.sourceUrl,
      panes: CANVAS_STATE_DEFAULT.panes,
    });

    canvasRef.current?.setTransform(
      CANVAS_STATE_DEFAULT.x,
      CANVAS_STATE_DEFAULT.y,
      CANVAS_STATE_DEFAULT.scale,
    );

    toast.success("Layout Reset");
  };

  return (
    <motion.div
      className="absolute left-10 top-10 w-fit rounded-md border border-background-content bg-background p-1"
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
        duration: 0.5,
        bounce: 0,
      }}
    >
      <div className="flex flex-row gap-1">
        <Input
          className="border border-background-200 bg-background-100 text-lg placeholder:text-background-content/30"
          type="url"
          value={canvasState.sourceUrl}
          placeholder="Enter your URL..."
          onChange={(e) =>
            setCanvasState({ ...canvasState, sourceUrl: e.target.value })
          }
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Create new pane"
              variant="secondary-outline"
              size="icon"
              onClick={onClickCreateNewPane}
            >
              <TbDeviceMobilePlus size="20" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>New Pane</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Reset to default layout"
              variant="secondary-outline"
              size="icon"
              onClick={onClickResetCanvas}
            >
              <VscDebugRestart size="20" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset Layout</p>
          </TooltipContent>
        </Tooltip>
        <ThemeToggle />
      </div>
    </motion.div>
  );
};

export { Menu };
