import { type ReactNode } from "react";
import { Rnd } from "react-rnd";

import { cn, PANE_BORDER_WIDTH, PANE_TOOLBAR_HEIGHT } from "~/lib/utils";

import { type PaneState } from "./Pane";

interface PaneWrapperProps {
  scale: number;
  paneState: PaneState;
  setPaneState: (updatedState: PaneState) => void;
  children: ReactNode;
}

const PaneWrapper = ({
  scale,
  paneState,
  setPaneState,
  children,
}: PaneWrapperProps) => {
  const getRealDimensions = (ref: HTMLElement): [number, number] => {
    return [
      Number(ref.style.width.replace("px", "")) - 2 * PANE_BORDER_WIDTH,
      Number(ref.style.height.replace("px", "")) -
        2 * PANE_BORDER_WIDTH -
        PANE_TOOLBAR_HEIGHT,
    ];
  };

  const { isLocked, isMinimized } = paneState;

  return (
    <Rnd
      className={cn("flex items-center justify-center")}
      style={{
        zIndex:
          paneState.isMoving || paneState.isResizing
            ? 100 + paneState.z
            : paneState.z,
      }}
      size={{
        width: `${paneState.width + 2 * PANE_BORDER_WIDTH}px`,
        height: `${paneState.height + 2 * PANE_BORDER_WIDTH + PANE_TOOLBAR_HEIGHT}px`,
      }}
      minWidth={360 + 2 * PANE_BORDER_WIDTH}
      minHeight={
        isMinimized
          ? PANE_TOOLBAR_HEIGHT - 2 * PANE_BORDER_WIDTH
          : 150 + PANE_TOOLBAR_HEIGHT + 2 * PANE_BORDER_WIDTH
      }
      position={{ x: paneState.x, y: paneState.y }}
      scale={scale}
      dragHandleClassName="pane-toolbar"
      disableDragging={isLocked}
      cancel="button,input"
      enableResizing={!isLocked && !isMinimized}
      onDrag={(e, d) => {
        e.stopPropagation();

        if (isLocked) return;

        setPaneState({ ...paneState, isMoving: true, x: d.x, y: d.y });
      }}
      onDragStop={(_e, d) => {
        if (isLocked) return;

        setPaneState({ ...paneState, isMoving: false, x: d.x, y: d.y });
      }}
      onResize={(e, _direction, ref, _delta, position) => {
        e.stopPropagation();

        if (isLocked) return;

        const [width, height] = getRealDimensions(ref);

        setPaneState({
          ...paneState,
          x: position.x,
          y: position.y,
          width,
          height,
          preMinimizedHeight: height,
          paneSizeVariant: "CUSTOM",
          isResizing: true,
        });
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        if (isLocked) return;

        const [width, height] = getRealDimensions(ref);

        setPaneState({
          ...paneState,
          x: position.x,
          y: position.y,
          width,
          height,
          preMinimizedHeight: height,
          paneSizeVariant: "CUSTOM",
          isResizing: false,
        });
      }}
    >
      {children}
    </Rnd>
  );
};

export { PaneWrapper };
