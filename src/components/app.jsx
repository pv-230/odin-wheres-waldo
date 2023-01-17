import { useState } from 'react';
import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import SCENES from '../data/scenes';
import Start from './start';
import Game from './game';

const StyledApp = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--dark-color);
  background-color: var(--light-color);
`;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [scene, setScene] = useState(SCENES[0]);

  /**
   * Starts the game.
   */
  function startGame() {
    setGameStarted(true);
  }

  function stopGame() {
    setGameStarted(false);
  }

  /**
   * Event handler for scene selections.
   * @param {Event} e
   */
  function handleSceneSelection(e) {
    const sceneVal = Number(e.currentTarget.dataset.scene);
    setScene(SCENES[sceneVal]);
  }

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {gameStarted ? (
          <Game scene={scene} stopGame={stopGame} />
        ) : (
          <Start scene={scene} handleSceneSelection={handleSceneSelection} startGame={startGame} />
        )}
      </StyledApp>
    </>
  );
}

export default App;
