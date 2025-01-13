"use client";

import { useRef, FC, useEffect, useState } from "react";

import Wave from "./wave";
import useResponsiveSize from "@/hooks/useResponsiveSize";
import { CanvasContext } from "@/hooks/useCanvas";

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useResponsiveSize();

  const [context, setContext] = useState<
    CanvasRenderingContext2D | undefined
  >();

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (ctx) setContext(ctx);
  }, []);

  return (
    <div className=" bottom-0 left-0 right-0  overflow-hidden">
      <CanvasContext.Provider value={{ context: context }}>
        <canvas
          id="canvas"
          ref={canvasRef}
          width={width}
          height={height}
        ></canvas>
        <Wave />
      </CanvasContext.Provider>
    </div>
  );
};

export default Canvas;
