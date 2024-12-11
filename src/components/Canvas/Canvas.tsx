"use client";

import {
  Dispatch,
  type RefObject,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  type ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import { type PaneState } from "~/components/Pane/Pane";

export interface CanvasState {
  x: number;
  y: number;
  scale: number;
  isDisabled: boolean;
  sourceUrl: string;
  panes: PaneState[];
}

interface CanvasProps {
  canvasRef: RefObject<ReactZoomPanPinchContentRef>;
  canvasState: CanvasState;
  setCanvasState: Dispatch<SetStateAction<CanvasState>>;
  children: React.ReactNode;
}

const Canvas = ({
  canvasRef,
  canvasState,
  setCanvasState,
  children,
}: CanvasProps) => {
  const [canvasInit, setCanvasInit] = useState(false);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (["Meta", "Control"].includes(event.key)) {
      setCanvasState((prevState: CanvasState) => ({
        ...prevState,
        isDisabled: false,
      }));
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (["Meta", "Control"].includes(event.key)) {
      setCanvasState((prevState: CanvasState) => ({
        ...prevState,
        isDisabled: true,
      }));
    }
  }, []);

  const handleWindowBlur = useCallback(() => {
    setCanvasState((prevState: CanvasState) => ({
      ...prevState,
      isDisabled: false,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [handleKeyDown, handleKeyUp, handleWindowBlur]);

  return (
    <Suspense>
      <TransformWrapper
        ref={canvasRef}
        onInit={() => setCanvasInit(true)}
        minScale={0.2}
        initialScale={canvasState.scale}
        initialPositionX={canvasState.x}
        initialPositionY={canvasState.y}
        onTransformed={(ref) =>
          setCanvasState({
            ...canvasState,
            x: ref.state.positionX,
            y: ref.state.positionY,
            scale: ref.state.scale,
          })
        }
        centerZoomedOut
        limitToBounds={false}
        alignmentAnimation={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          {canvasInit && children}
        </TransformComponent>
      </TransformWrapper>
    </Suspense>
  );
};

export { Canvas };
