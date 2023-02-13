import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SceneViewport from './scene-viewport';
import EndDialog from './end-dialog';
import { Text, StopButton, CharacterImage, Check } from '../common/common-styles';
import { charactersCropped } from '../data/image-maps';

const TOP_BAR_HEIGHT = 175;

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--dark-color);
  position: relative;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: ${TOP_BAR_HEIGHT}px;
  padding: 20px;
`;

const TopBarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
`;

const TimerBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Timer = styled.div`
  padding: 5px;
  border: 1px solid var(--light-color);
  border-radius: 5px;
  background-color: var(--dark-color);
`;

const TimerText = styled(Text)`
  color: var(--light-color);
  font-size: 2rem;
  user-select: none;
`;

const CharacterImages = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CharacterImageWrapper = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
`;

//-------------------------------------------------------------------------------------------------

function Game({ scene, stopGame }) {
  const [gameOver, setGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [charactersFound, setCharactersFound] = useState({
    waldo: false,
    wenda: false,
    odlaw: false,
    whitebeard: false,
  });

  /**
   * Starts a timer when the game starts.
   */
  useEffect(() => {
    var timer;

    if (!gameOver) {
      timer = setTimeout(() => {
        let newSeconds = seconds + 1;
        if (newSeconds === 60) {
          newSeconds = 0;
          setMinutes((prevMinutes) => prevMinutes + 1);
        }
        setSeconds(newSeconds);
      }, 1000);
    } else {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [gameOver, seconds]);

  /**
   * Stops the game when all characters are found.
   */
  useEffect(() => {
    const foundValues = Object.values(charactersFound);
    for (let i = 0; i < foundValues.length; i++) {
      if (!foundValues[i]) return;
    }
    setGameOver(true);
  }, [charactersFound]);

  return (
    <StyledGame>
      <TopBar>
        <TopBarContent>
          {/* Game timer and quit button */}
          <TimerBar>
            <Timer>
              <TimerText>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </TimerText>
            </Timer>
            <StopButton onClick={stopGame}>Quit</StopButton>
          </TimerBar>

          {/* Character statuses */}
          <CharacterImages>
            <CharacterImageWrapper>
              <Check showCheck={charactersFound.waldo} />
              <CharacterImage
                src={charactersCropped.get('waldo')}
                isGray={charactersFound.waldo}
              />
            </CharacterImageWrapper>
            <CharacterImageWrapper>
              <Check showCheck={charactersFound.wenda} />
              <CharacterImage
                src={charactersCropped.get('wenda')}
                isGray={charactersFound.wenda}
              />
            </CharacterImageWrapper>
            <CharacterImageWrapper>
              <Check showCheck={charactersFound.odlaw} />
              <CharacterImage
                src={charactersCropped.get('odlaw')}
                isGray={charactersFound.odlaw}
              />
            </CharacterImageWrapper>
            <CharacterImageWrapper>
              <Check showCheck={charactersFound.whitebeard} />
              <CharacterImage
                src={charactersCropped.get('whitebeard')}
                isGray={charactersFound.whitebeard}
              />
            </CharacterImageWrapper>
          </CharacterImages>
        </TopBarContent>
      </TopBar>

      {/* Game scene area */}
      <SceneViewport
        scene={scene}
        topBarHeight={TOP_BAR_HEIGHT}
        charactersFound={charactersFound}
        setCharactersFound={setCharactersFound}
        isDisabled={gameOver}
      />

      {/* Dialog to allow user to submit game score */}
      <EndDialog
        scene={scene}
        gameOver={gameOver}
        seconds={seconds}
        minutes={minutes}
        stopGame={stopGame}
      />
    </StyledGame>
  );
}

Game.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  stopGame: PropTypes.func.isRequired,
};

export default Game;
