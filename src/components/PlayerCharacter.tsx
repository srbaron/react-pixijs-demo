import { Assets, Texture } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";
import player from "../assets/indy2.png";
import { useTick } from "@pixi/react";
import { usePlayerMovement } from "./hooks/usePlayerMovement";
import {
  DEFAULT_X_POS,
  DEFAULT_Y_POS,
  DirectionEnum,
  PLAYER_MOVE_SPEED,
} from "../constants";
import {
  calculateNewTarget,
  checkCollisions,
  handleMovement,
} from "../helpers";
import { collisionMap1 } from "./Level1/collisionMap1";

interface PlayerProps {
  movePlayer: (gridX: number, gridY: number) => void;
}

export const PlayerCharacter = ({ movePlayer }: PlayerProps) => {
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS });
  const targetPosition = useRef<{ x: number; y: number } | null>(null);
  const currentDirection = useRef<DirectionEnum | null>(null);
  const spriteRef = useRef(null);
  const isMoving = useRef(false);

  const [texture, setTexture] = useState(Texture.EMPTY);
  const { getDirectionEnum } = usePlayerMovement();

  useEffect(() => {
    movePlayer(position.current.x, position.current.y);
  }, [movePlayer]);

  const setNextTarget = useCallback((direction: DirectionEnum) => {
    if (targetPosition.current) return;
    const { x, y } = position.current;
    currentDirection.current = direction;
    const newTarget = calculateNewTarget(x, y, direction);

    if (checkCollisions(newTarget, collisionMap1)) {
      targetPosition.current = newTarget;
    }
  }, []);

  useTick((ticker) => {
    const dir = getDirectionEnum();
    if (dir) {
      setNextTarget(dir);
    }
    if (targetPosition.current) {
      const { position: newPosition, completed } = handleMovement(
        position.current,
        targetPosition.current,
        PLAYER_MOVE_SPEED,
        ticker.deltaTime,
      );

      position.current = newPosition;
      isMoving.current = true;

      if (completed) {
        const { x, y } = position.current;
        movePlayer(x, y);

        targetPosition.current = null;
        isMoving.current = false;
      }
    }
  });

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(player).then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  return (
    <pixiSprite
      ref={spriteRef}
      anchor={{ x: 0.5, y: 1 }}
      eventMode={"static"}
      texture={texture}
      scale={1.5}
      x={position.current.x}
      y={position.current.y}
    />
  );
};
