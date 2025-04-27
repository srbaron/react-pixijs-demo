import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, TextStyle, Text } from "pixi.js";
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
  Text,
});

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

enum ScenesEnum {
  MAIN_MENU = "MAIN_MENU",
  GAME = "GAME",
}

const textStyle = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontStyle: "italic",
  fontWeight: "bold",
  fill: "#FFFFFF",
  stroke: { color: "#4a1850", width: 5, join: "round" },
});

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

  return (
    <>
      <div>
        <button onClick={() => setCurrentScene(ScenesEnum.GAME)}>
          Swap to Game
        </button>
        <button onClick={() => setCurrentScene(ScenesEnum.MAIN_MENU)}>
          Swap to Menu
        </button>
      </div>
      <Center>
        <Application width={canvas.width} height={canvas.height}>
          {currentScene === ScenesEnum.MAIN_MENU ? (
            <pixiText
              text="PLAY GAME"
              x={GAME_WIDTH / 2}
              y={GAME_HEIGHT / 2}
              style={textStyle}
            />
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
