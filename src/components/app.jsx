import { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import { Text, Spinner } from '../common/common-styles';
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoadingText = styled(Text)`
  font-size: 2rem;
`;

//-------------------------------------------------------------------------------------------------

function App() {
  var content;
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [scene, setScene] = useState(scenes[0]);
  const [loadingText, setLoadingText] = useState('Loading');

  /**
   * Preloads all images when the app first mounts.
   */
  useEffect(() => {
    // Arrays containg the URLs of images
    const charactersFullSources = Array.from(charactersFull).map((element) => element[1]);
    const charactersCroppedSources = Array.from(charactersCropped).map((element) => element[1]);
    const scenesFullSources = Array.from(scenesFull).map((element) => element[1]);
    const scenesCroppedSources = Array.from(scenesCropped).map((element) => element[1]);
    const iconsSources = Array.from(icons).map((element) => element[1]);

    // IIFE that creates image instances to load
    (async () => {
      const iconsPromises = iconsSources.map(
        (imageSource) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = imageSource;
            image.onload = () => resolve(imageSource);
          })
      );

      const charactersCroppedPromises = charactersCroppedSources.map(
        (imageSource) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = imageSource;
            image.onload = () => resolve(imageSource);
          })
      );

      const scenesCroppedPromises = scenesCroppedSources.map(
        (imageSource) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = imageSource;
            image.onload = () => resolve(imageSource);
          })
      );

      const charactersFullPromises = charactersFullSources.map(
        (imageSource) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = imageSource;
            image.onload = () => resolve(imageSource);
          })
      );

      const scenesFullPromises = scenesFullSources.map(
        (imageSource) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = imageSource;
            image.onload = () => resolve(imageSource);
          })
      );

      // Displays loading status
      setLoadingText('Loading icons');
      await Promise.all(iconsPromises);
      setLoadingText('Loading cropped character images');
      await Promise.all(charactersCroppedPromises);
      setLoadingText('Loading cropped scene images');
      await Promise.all(scenesCroppedPromises);
      setLoadingText('Loading full character images');
      await Promise.all(charactersFullPromises);
      setLoadingText('Loading full scene images');
      await Promise.all(scenesFullPromises);
      setGameLoaded(true);
      setLoadingText('Loading complete');
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

  // Shows a spinner if assets not finished loading
  if (gameLoaded) {
    content = gameStarted ? (
      <Game scene={scene} stopGame={stopGame} />
    ) : (
      <StartMenu scene={scene} handleSceneSelection={handleSceneSelection} startGame={startGame} />
    );
  } else {
    content = (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>{loadingText}</LoadingText>
      </LoadingWrapper>
    );
  }

  return (
    <>
      <GlobalStyle />
      <StyledApp>{content}</StyledApp>
    </>
  );
}

export default App;
