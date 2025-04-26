import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import level1 from "../assets/tilemap1.png";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants";

export const Level1 = () => {
  const spriteRef = useRef(null);
  const [texture, setTexture] = useState(Texture.EMPTY);

  // Preload the sprite if it hasn't been loaded yet
  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(level1).then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  return (
    <pixiSprite
      ref={spriteRef}
      eventMode={"static"}
      texture={texture}
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
    />
  );
};
