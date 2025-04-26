import { Application, extend } from '@pixi/react'
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';
import { Level1 } from './components/Level1'
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from './constants';
import styled from 'styled-components';
import { PlayerCharacter } from './components/PlayerCharacter';
import { useCallback, useState } from 'react';
import { Position } from './components/types';

extend({
  Container,
  Graphics,
  Sprite,
});

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 })
  const updatePlayerPos = useCallback((x: number, y: number) => {
    setPlayerPos({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    })
  }, [])

  return (
    <Center>
      <Application width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Level1 />
        <PlayerCharacter movePlayer={updatePlayerPos}/>
      </Application>
    </Center>
  )
}


export default App
