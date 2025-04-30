import { useRef, PropsWithChildren, use } from "react";
import { useTick } from "@pixi/react";
import { Graphics as PIXIGraphics } from "pixi.js";

import { Canvas, Position } from "../types";
import { CAMERA_ZOOM, TILE_SIZE } from "../constants";
import { GamePropertyContext } from "./GamePropertyProvider";

interface CameraProps extends PropsWithChildren {
  playerPos: Position;
  canvasSize: Canvas;
}

const lerp = (start: number, end: number) => {
  return start + (end - start) * 0.03;
};

export const Camera = ({ playerPos, canvasSize, children }: CameraProps) => {
  const context = use(GamePropertyContext);
  const zoomScale = context ? context.properties.zoomScale : 1;
  const newCameraZoomScale = zoomScale * CAMERA_ZOOM;
  const containerRef = useRef<PIXIGraphics>(null);

  const cameraPosition = useRef<{ x: number; y: number }>({
    x: canvasSize.width / 2,
    y: canvasSize.height / 2,
  });

  useTick(() => {
    if (containerRef.current) {
      const targetX =
        canvasSize.width / 2 -
        playerPos.x * TILE_SIZE * newCameraZoomScale -
        TILE_SIZE;
      const targetY =
        canvasSize.height / 2 -
        playerPos.y * TILE_SIZE * newCameraZoomScale -
        TILE_SIZE;

      cameraPosition.current.x = lerp(cameraPosition.current.x, targetX);
      cameraPosition.current.y = lerp(cameraPosition.current.y, targetY);

      containerRef.current.x = cameraPosition.current.x;
      containerRef.current.y = cameraPosition.current.y;
    }
  });

  return (
    <pixiContainer ref={containerRef} scale={newCameraZoomScale}>
      {children}
    </pixiContainer>
  );
};
