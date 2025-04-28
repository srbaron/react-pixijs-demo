import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { GAME_HEIGHT, GAME_WIDTH, ScenesEnum } from "../constants";
import { Assets, Texture, Ticker } from "pixi.js";
import menuBg from "../assets/menuBg.png";
import title from "../assets/title.png";
import start from "../assets/start.png";
import startHover from "../assets/startHover.png";
import { useTick } from "@pixi/react";

interface MenuProps {
  setCurrentScene: Dispatch<SetStateAction<ScenesEnum>>;
}

const TEXT_X_POS = 600;
const TEXT_Y_POS = 200;

export const Menu = ({ setCurrentScene }: MenuProps) => {
  const spriteRef = useRef(null);
  const [yPos, setYPos] = useState(TEXT_Y_POS);
  const [texture, setTexture] = useState(Texture.EMPTY);
  const [startText, setStartText] = useState(Texture.EMPTY);
  const [startHoverText, setStartHoverText] = useState(Texture.EMPTY);
  const [titleText, setTitleText] = useState(Texture.EMPTY);
  const [isHovering, setIsHovering] = useState(false);

  // Preload the sprite if it hasn't been loaded yet
  useEffect(() => {
    Assets.load(menuBg).then((result) => {
      setTexture(result);
    });
    Assets.load(title).then((result) => {
      setTitleText(result);
    });
    Assets.load(start).then((result) => {
      setStartText(result);
    });
    Assets.load(startHover).then((result) => {
      setStartHoverText(result);
    });
  }, [texture]);

  const animateText = useCallback(
    (ticker: Ticker) =>
      setYPos((prev) => (prev += Math.cos(ticker.lastTime) * 0.2)),
    [],
  );

  useTick((ticker) => animateText(ticker));

  console.log(yPos);

  return (
    <>
      <pixiSprite
        ref={spriteRef}
        eventMode={"static"}
        texture={texture}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
      <pixiContainer x={GAME_WIDTH / 2} y={yPos + 100}>
        <pixiSprite
          ref={spriteRef}
          eventMode={"static"}
          texture={titleText}
          anchor={0.5}
          width={TEXT_X_POS}
          height={TEXT_Y_POS}
        />
        <pixiSprite
          ref={spriteRef}
          eventMode={"static"}
          texture={isHovering ? startHoverText : startText}
          width={TEXT_X_POS}
          height={TEXT_Y_POS}
          y={150}
          anchor={0.5}
          scale={isHovering ? 1.2 : 1}
          onClick={() => setCurrentScene(ScenesEnum.GAME)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          cursor={"pointer"}
        />
      </pixiContainer>
    </>
  );
};
