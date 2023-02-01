import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SceneViewport from './scene-viewport';
import { Text, Button, CharacterImage, Check } from '../common/common-styles';
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

const StopButton = styled(Button)`
  &:hover {
    background-color: orangered;
  }

  &:active {
    background-color: tomato;
  }

  background-color: tomato;
  height: 100%;
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

const EndDialog = styled.div`
  display: ${(props) => (props.showEndDialog ? 'flex' : 'none')};
  flex-direction: column;
  width: 320px;
  height: 250px;
  position: absolute;
  top: calc(50vh - 125px);
  left: calc(50vw - 160px);
  background-color: var(--light-color);
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: center;
  background-color: crimson;
  width: 100%;
  padding: 10px 0;
  border-left: 1px solid var(--dark-color);
  border-top: 1px solid var(--dark-color);
  border-right: 1px solid var(--dark-color);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  height: 100%;
  border-left: 1px solid var(--dark-color);
  border-bottom: 1px solid var(--dark-color);
  border-right: 1px solid var(--dark-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled(Button)`
  background-color: greenyellow;

  &:hover {
    background-color: lawngreen;
  }

  &:active {
    background-color: greenyellow;
  }
`;

//-------------------------------------------------------------------------------------------------

function Game({ scene, stopGame }) {
  var secondsText = 'second';
  var minutesText = 'minute';

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

  if (seconds === 0 || seconds > 1) {
    secondsText = 'seconds';
  }

  if (minutes > 1) {
    minutesText = 'minutes';
  }

  return (
    <StyledGame>
      <TopBar>
        <TopBarContent>
          <TimerBar>
            <Timer>
              <TimerText>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </TimerText>
            </Timer>
            <StopButton onClick={stopGame}>Quit</StopButton>
          </TimerBar>
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
      <SceneViewport
        scene={scene}
        topBarHeight={TOP_BAR_HEIGHT}
        charactersFound={charactersFound}
        setCharactersFound={setCharactersFound}
      />
      <EndDialog showEndDialog={gameOver}>
        <DialogHeader>
          <Text style={{ fontSize: '2rem', color: 'var(--light-color)' }}>Congratulations!</Text>
        </DialogHeader>
        <DialogContent>
          <ScoreWrapper>
            <Text style={{ fontSize: '1.2rem' }}>You found all the characters in</Text>
            <Text style={{ fontSize: '1.2rem' }}>
              {minutes > 0 ? `${minutes} ${minutesText}` : null} {seconds} {secondsText}
            </Text>
          </ScoreWrapper>
          <Text style={{ textAlign: 'center' }}>
            You can anonymously submit your time score to the leaderboards.
          </Text>
          <ButtonWrapper>
            <SubmitButton>Submit</SubmitButton>
            <StopButton onClick={stopGame}>Main Menu</StopButton>
          </ButtonWrapper>
        </DialogContent>
      </EndDialog>
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
