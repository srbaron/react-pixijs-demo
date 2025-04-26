import { DirectionEnum, TILE_SIZE } from "../constants"
import { Position } from "./types"

export const handleMovement = (
    currentPosition: Position,
    targetPosition: Position,
    moveSpeed: number,
    delta: number
) => {
    const step = moveSpeed * TILE_SIZE * delta
    const distance = Math.hypot(
        targetPosition.x - currentPosition.x,
        targetPosition.y - currentPosition.y
    )

    if (distance <= step) {
        return {
        position: targetPosition,
        completed: true,
        }
    }

    return {
        position: continueMovement(currentPosition, targetPosition, step),
        completed: false,
    }
}

export const continueMovement = (
    currentPosition: Position,
    targetPosition: Position,
    step: number
  ): Position => {
    return {
        x: moveTowards(currentPosition.x, targetPosition.x, step),
        y: moveTowards(currentPosition.y, targetPosition.y, step),
    }
}

export const moveTowards = (
    current: number,
    target: number,
    maxStep: number
  ) => {
    return (
        current +
        Math.sign(target - current) * Math.min(Math.abs(target - current), maxStep)
    )
}

export const calculateNewTarget = (
    x: number,
    y: number,
    direction: DirectionEnum
  ): Position => {
    return {
      x:
        (x / TILE_SIZE) * TILE_SIZE +
        (direction === DirectionEnum.LEFT
          ? -TILE_SIZE
          : direction === DirectionEnum.RIGHT
          ? TILE_SIZE
          : 0),
      y:
        (y / TILE_SIZE) * TILE_SIZE +
        (direction === DirectionEnum.UP ? -TILE_SIZE : direction === DirectionEnum.DOWN ? TILE_SIZE : 0),
    }
  }

