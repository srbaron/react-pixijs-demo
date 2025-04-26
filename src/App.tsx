import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from "./constants";
import styled from "styled-components";
import { PlayerCharacter } from "./components/PlayerCharacter";
import { useCallback, useState } from "react";
import { Canvas, Position } from "./types";
import { Camera } from "./components/Camera";
import { Level1 } from "./components/Level1/Level1";
import { Chest } from "./components/Items/Chest";

extend({
  Container,
  Graphics,
  Sprite,
});

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const canvas: Canvas = { width: GAME_WIDTH, height: GAME_HEIGHT };
  const updatePlayerPos = useCallback((x: number, y: number) => {
    setPlayerPos({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    });
  }, []);

  return (
    <Center>
      <Application width={canvas.width} height={canvas.height}>
        <Camera playerPos={playerPos} canvasSize={canvas}>
          <Level1 />
          <Chest />
          <PlayerCharacter movePlayer={updatePlayerPos} />
        </Camera>
      </Application>
    </Center>
  );
};

export default App;
