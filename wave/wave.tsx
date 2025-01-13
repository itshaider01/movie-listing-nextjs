"use client";
import { PrimaryGradientColors_20 } from "@/constant/data";
import WaveEntity from "@/entity/wave-entity";
import { useCanvasContext } from "@/hooks/useCanvas";
import useResponsiveSize from "@/hooks/useResponsiveSize";
import { FC } from "react";

const Wave: FC = () => {
  const { context } = useCanvasContext();
  const { width, height } = useResponsiveSize();

  let frequency = 0.001;
  let timer = 1;
  const waves = {
    frontWave: new WaveEntity([0.0081, 0.015], 1, 1, PrimaryGradientColors_20),
    backWave: new WaveEntity([0.0022, 0.005], 1, 1.2, PrimaryGradientColors_20),
  };

  const render = () => {
    context?.clearRect(0, 0, width, height);
    Object.entries(waves).forEach(([, wave]) => {
      wave.draw(context!, width, height, frequency);
    });
    if (timer === 500) {
      timer = 1;
    }
    timer++;
    frequency += 0.001;
    requestAnimationFrame(render);
  };
  if (context) render();
  return null;
};

export default Wave;
