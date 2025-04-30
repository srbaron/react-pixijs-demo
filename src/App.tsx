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
import { loadSound, playSound, toggleSound } from "./helpers";
import { PropertiesBar } from "./components/PropertiesBar";
import "./style.css";
import { GamePropertyProvider } from "./components/GamePropertyProvider";

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

export const StyledButton = styled.button<{ $isMuted?: boolean }>`
  font-weight: bold;
  padding: 12px 24px;
  color: black;
  background-color: white;
  cursor: pointer;
  border: 3px solid black;
  border-radius: 6px;
  font-family: "Jersey 25", sans-serif;
  font-size: 24px;
  background-color: ${(props) => (props.$isMuted ? "#ffb3b3" : "#eaeaf8")};
  text-decoration: ${(props) => (props.$isMuted ? "line-through" : "none")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px;

  & > button {
    margin: 0 3px;
  }
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
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await loadSound();
      playSound();
    };

    setup();
  }, []);

  const muteAudio = () => {
    setIsMuted(!isMuted);
    toggleSound();
  };

  return (
    <GamePropertyProvider>
      <ButtonWrapper>
        <StyledButton onClick={() => setCurrentScene(ScenesEnum.MAIN_MENU)}>
          MAIN MENU
        </StyledButton>
        <StyledButton onClick={() => setCurrentScene(ScenesEnum.GAME)}>
          GAME
        </StyledButton>
        <StyledButton $isMuted={isMuted} onClick={muteAudio}>
          MUTE
        </StyledButton>
      </ButtonWrapper>
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
        <PropertiesBar />
      </Center>
    </GamePropertyProvider>
  );
};

export default App;
