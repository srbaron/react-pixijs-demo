import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, ScenesEnum, TILE_SIZE } from "./constants";
import styled from "styled-components";
import { PlayerCharacter } from "./components/PlayerCharacter";
import { useCallback, useEffect, useState } from "react";
import { Canvas, Position } from "./types";
import { Camera } from "./components/Camera";
import { Level1 } from "./components/Level1/Level1";
import { Chest } from "./components/Items/Chest";
import { Menu } from "./components/Menu";
import { loadSound, playSound } from "./helpers";

extend({
  Container,
  Graphics,
  Sprite,
  Text,
});

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const App = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [currentScene, setCurrentScene] = useState<ScenesEnum>(
    ScenesEnum.MAIN_MENU,
  );
  const canvas: Canvas = { width: GAME_WIDTH, height: GAME_HEIGHT };
  const updatePlayerPos = useCallback((x: number, y: number) => {
    setPlayerPos({
      x: Math.floor(x / TILE_SIZE),
      y: Math.floor(y / TILE_SIZE),
    });
  }, []);

  useEffect(() => {
    const setup = async () => {
      await loadSound();
      playSound();
    };

    setup();
  }, []);

  return (
    <>
      <Center>
        <Application width={canvas.width} height={canvas.height}>
          {currentScene === ScenesEnum.MAIN_MENU ? (
            <Menu setCurrentScene={setCurrentScene} />
          ) : null}
          {currentScene === ScenesEnum.GAME ? (
            <Camera playerPos={playerPos} canvasSize={canvas}>
              <Level1 />
              <Chest />
              <PlayerCharacter movePlayer={updatePlayerPos} />
            </Camera>
          ) : null}
        </Application>
      </Center>
    </>
  );
};

export default App;
