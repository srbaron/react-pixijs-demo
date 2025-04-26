import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import chest from "../../assets/chest.png";
import openChest from "../../assets/openChest.png";

export const Chest = () => {
  const spriteRef = useRef(null);
  const [texture, setTexture] = useState(Texture.EMPTY);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load(chest).then((result) => {
        setTexture(result);
      });
    }
    if (isOpen) {
      Assets.load(openChest).then((result) => {
        setTexture(result);
      });
    }
  }, [texture, isOpen]);

  const onOpenChest = () => {
    if (isOpen) {
      alert("Item already received...");
    } else {
      setIsOpen(true);
      alert("Received amazing new item!");
    }
  };

  return (
    <pixiSprite
      ref={spriteRef}
      anchor={{ x: 0.5, y: 1 }}
      eventMode={"static"}
      texture={texture}
      scale={0.75}
      onClick={onOpenChest}
      x={250}
      y={200}
      cursor="pointer"
    />
  );
};
