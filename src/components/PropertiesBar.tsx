import styled from "styled-components";
import { StyledButton } from "../App";

export const PropertiesBar = () => {
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
    font-family: "Pixelify Sans", sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin: 12px;
  `;
  return (
    <PropertiesOutline>
      <StyledButton>RESET</StyledButton>
      <PropertyLabel>Window Scale:</PropertyLabel>
      <PropertyLabel>Speed Scale:</PropertyLabel>
      <PropertyLabel>Volume:</PropertyLabel>
    </PropertiesOutline>
  );
};
