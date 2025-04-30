import styled from "styled-components";
import { StyledButton } from "../App";
import {
  DEFAULT_GAME_PROPERTY_VALUES,
  GamePropertyContext,
} from "./GamePropertyProvider";
import { use } from "react";
import { setVolume } from "../helpers";

const PropertiesOutline = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6px;
  padding: 24px;
  border: 3px solid black;
  border-radius: 6px;
  width: 500px;
  height: 300px;
`;

const PropertyLabel = styled.label`
  font-family: "Jersey 25", sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;

export const PropertiesBar = () => {
  const context = use(GamePropertyContext);

  const reset = () => {
    context?.setProperties(DEFAULT_GAME_PROPERTY_VALUES);
    setVolume(1);
  };
  const updateWindowScale = (e: any) =>
    context?.setProperties({
      ...context.properties,
      zoomScale: e.target.value,
    });

  const updateSpeedScale = (e: any) =>
    context?.setProperties({
      ...context.properties,
      speedScale: e.target.value,
    });

  const updateVolume = (e: any) => {
    context?.setProperties({ ...context.properties, volume: e.target.value });
    setVolume(e.target.value);
  };

  console.log(context?.properties);
  return (
    <PropertiesOutline>
      <StyledButton onClick={reset}>RESET PROPERTIES</StyledButton>
      <PropertyLabel>Zoom Scale:</PropertyLabel>
      <input
        type="range"
        value={context?.properties.zoomScale}
        min="0"
        max="2"
        step="0.1"
        onChange={updateWindowScale}
      />
      <PropertyLabel>Player Speed Scale:</PropertyLabel>
      <input
        type="range"
        value={context?.properties.speedScale}
        min="0"
        max="2"
        step="0.1"
        onChange={updateSpeedScale}
      />
      <PropertyLabel>Volume:</PropertyLabel>
      <input
        type="range"
        value={context?.properties.volume}
        min="0"
        max="1"
        step="0.1"
        onChange={updateVolume}
      />
    </PropertiesOutline>
  );
};
