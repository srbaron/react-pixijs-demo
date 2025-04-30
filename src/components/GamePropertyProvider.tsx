import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { GameProperties } from "../types";

export const DEFAULT_GAME_PROPERTY_VALUES: GameProperties = {
  zoomScale: 1,
  speedScale: 1,
  volume: 1,
};

interface GamePropertyContextType {
  properties: GameProperties;
  setProperties: Dispatch<SetStateAction<GameProperties>>;
}

export const GamePropertyContext = createContext<
  GamePropertyContextType | undefined
>(undefined);

export const GamePropertyProvider = ({ children }: PropsWithChildren) => {
  const [properties, setProperties] = useState<GameProperties>(
    DEFAULT_GAME_PROPERTY_VALUES,
  );

  return (
    <GamePropertyContext.Provider value={{ properties, setProperties }}>
      {children}
    </GamePropertyContext.Provider>
  );
};
