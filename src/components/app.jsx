import { useState } from 'react';
import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import SCENES from '../data/scenes';
import Start from './start';
import Game from './game';
import Scene from './scene';

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
  const SceneComponent = <Scene scene={scene} />;

  /**
   * Starts the game.
   */
  function startGame() {
    setGameStarted(true);
  }

  /**
   * Stops the game.
   */
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
          <Game SceneComponent={SceneComponent} stopGame={stopGame} />
        ) : (
          <Start scene={scene} handleSceneSelection={handleSceneSelection} startGame={startGame} />
        )}
      </StyledApp>
    </>
  );
}

export default App;
