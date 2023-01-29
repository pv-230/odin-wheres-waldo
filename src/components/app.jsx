import { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import { Spinner } from '../common/common-styles';
import StartMenu from './start-menu';
import Game from './game';
import scenes from '../data/scenes';
import {
  charactersFull,
  charactersCropped,
  scenesFull,
  scenesCropped,
  icons,
} from '../data/image-maps';

const StyledApp = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--dark-color);
  background-color: var(--light-color);
`;

//-------------------------------------------------------------------------------------------------

function App() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [scene, setScene] = useState(scenes[0]);

  /**
   *
   */
  useEffect(() => {
    const imageMaps = [charactersFull, charactersCropped, scenesFull, scenesCropped, icons];
    const imageSources = [];

    // Extracts the image sources from the image maps
    imageMaps.forEach((imageMap) => {
      const imageArray = Array.from(imageMap);
      imageArray.forEach((image) => imageSources.push(image[1]));
    });

    // Waits for all images to fire a load event
    (async () => {
      const imagePromises = imageSources.map(
        (imageSource) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = imageSource;
            image.onload = () => resolve(imageSource);
          })
      );

      await Promise.all(imagePromises);
      setGameLoaded(true);
    })();
  }, []);

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
    setScene(scenes[sceneVal]);
  }

  let content;
  if (gameLoaded) {
    content = gameStarted ? (
      <Game scene={scene} stopGame={stopGame} />
    ) : (
      <StartMenu scene={scene} handleSceneSelection={handleSceneSelection} startGame={startGame} />
    );
  } else {
    content = <Spinner />;
  }

  return (
    <>
      <GlobalStyle />
      <StyledApp>{content}</StyledApp>
    </>
  );
}

export default App;
