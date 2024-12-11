"use client";

import { useEffect, useRef, useState } from "react";
import { type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import { AnimatePresence } from "motion/react";

import { CANVAS_STATE_DEFAULT } from "~/lib/utils";

import { Menu } from "~/components/Canvas/Menu";
import { Canvas, type CanvasState } from "~/components/Canvas/Canvas";
import { Pane } from "~/components/Pane/Pane";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [popinDelays, setPopinDelays] = useState<number[]>([]);

  const canvasRef = useRef<ReactZoomPanPinchContentRef>(null);
  const [canvasState, setCanvasState] =
    useState<CanvasState>(CANVAS_STATE_DEFAULT);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem("canvas-state");

      if (storedState) {
        setCanvasState(JSON.parse(storedState));
      }
    } catch (error) {
      setCanvasState(CANVAS_STATE_DEFAULT);
    }

    setPopinDelays(
      Array(canvasState.panes.length)
        .fill(0)
        .map((_, i) => i / 10)
        .sort(() => Math.random() - 0.5),
    );
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("canvas-state", JSON.stringify(canvasState));
    }
  }, [canvasState]);

  if (!isLoaded) {
    return <div />;
  }

  return (
    <main>
      <div className="flex h-dvh w-screen flex-col">
        <Canvas
          canvasRef={canvasRef}
          canvasState={canvasState}
          setCanvasState={setCanvasState}
        >
          <AnimatePresence>
            {canvasState.panes.map((paneState, index) => (
              <Pane
                key={paneState.id}
                paneId={paneState.id}
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                popinDelay={popinDelays[index] ?? 0}
              />
            ))}
          </AnimatePresence>
        </Canvas>
        <Menu
          canvasRef={canvasRef}
          canvasState={canvasState}
          setCanvasState={setCanvasState}
        />
      </div>
    </main>
  );
}
