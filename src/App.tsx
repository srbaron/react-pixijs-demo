import { Application, extend } from '@pixi/react'
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';
import { Level1 } from './components/Level1'
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import styled from 'styled-components';

extend({
  Container,
  Graphics,
  Sprite,
});

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const App = () => {
  return (
    <Center>
      <Application width={GAME_WIDTH} height={GAME_HEIGHT}>
        <Level1 />
      </Application>
    </Center>
  )
}


export default App
