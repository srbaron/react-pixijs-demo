import { useCallback, useEffect, useState } from "react"
import { DirectionEnum } from "../../constants"


const MOVEMENT_DIRECTIONS: Record<string, DirectionEnum> = {
    KeyW: DirectionEnum.UP,
    KeyA: DirectionEnum.LEFT,
    KeyS: DirectionEnum.DOWN,
    KeyD: DirectionEnum.RIGHT,
}
export const usePlayerMovement = () => {
    const [heldDirections, setHeldDirections] = useState<DirectionEnum[]>([])
  
    const handleKey = useCallback((e: KeyboardEvent, isKeyDown: boolean) => {
      const direction = MOVEMENT_DIRECTIONS[e.code]
      if (!direction) return
  
      setHeldDirections((prev) => {
        if (isKeyDown) {
          return prev.includes(direction) ? prev : [direction, ...prev]
        }
        return prev.filter((dir) => dir !== direction)
      })
    }, [])
  
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => handleKey(e, true)
      const handleKeyUp = (e: KeyboardEvent) => handleKey(e, false)
  
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
      }
    }, [handleKey])
  
    const getDirectionEnum = useCallback(
      (): DirectionEnum | null => heldDirections[0] || null,
      [heldDirections]
    )
  
    return { getDirectionEnum }
  }