import { Assets, Texture } from "pixi.js";
import { DirectionEnum } from "../../constants";
import { useEffect, useState } from "react";
import charUp from "../../assets/charUp.png";
import charDown from "../../assets/charDown.png";
import charLeft from "../../assets/charLeft.png";
import charRight from "../../assets/charRight.png";

export const usePlayerAnimation = (direction: DirectionEnum | null) => {
  const [texture, setTexture] = useState(Texture.EMPTY);

  const getPlayerDirectionAsset = (direction: DirectionEnum | null) => {
    switch (direction) {
      case DirectionEnum.UP:
        return charUp;
      case DirectionEnum.DOWN:
        return charDown;
      case DirectionEnum.LEFT:
        return charLeft;
      case DirectionEnum.RIGHT:
        return charRight;
    }
  };

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(charDown).then((result) => {
        setTexture(result);
      });
    } else {
      const dirAsset = getPlayerDirectionAsset(direction);
      if (!dirAsset) return;
      Assets.load(dirAsset).then((result) => {
        setTexture(result);
      });
    }
  }, [direction, texture]);

  return texture;
};
