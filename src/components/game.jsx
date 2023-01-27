import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SceneViewport from './scene-viewport';
import { Text, Button, CharacterImage, Check } from '../common/common-styles';
import Waldo from '../images/characters/small/waldo-small.webp';
import Wenda from '../images/characters/small/wenda-small.webp';
import Odlaw from '../images/characters/small/odlaw-small.webp';
import Whitebeard from '../images/characters/small/whitebeard-small.webp';
import CheckSvg from '../images/icons/check.svg';

const TOP_BAR_HEIGHT = 175;

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--dark-color);
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

//-------------------------------------------------------------------------------------------------

function Game({ scene, stopGame }) {
  const [charactersFound, setCharactersFound] = useState({
    waldo: false,
    wenda: false,
    odlaw: false,
    whitebeard: false,
  });

  return (
    <StyledGame>
      <TopBar>
        <TopBarContent>
          <TimerBar>
            <Timer>
              <TimerText>00:00</TimerText>
            </Timer>
            <StopButton onClick={stopGame}>Quit</StopButton>
          </TimerBar>
          <CharacterImages>
            <CharacterImageWrapper>
              <Check src={CheckSvg} showCheck={charactersFound.waldo} />
              <CharacterImage src={Waldo} isGray={charactersFound.waldo} />
            </CharacterImageWrapper>
            <CharacterImageWrapper>
              <Check src={CheckSvg} showCheck={charactersFound.wenda} />
              <CharacterImage src={Wenda} isGray={charactersFound.wenda} />
            </CharacterImageWrapper>
            <CharacterImageWrapper>
              <Check src={CheckSvg} showCheck={charactersFound.odlaw} />
              <CharacterImage src={Odlaw} isGray={charactersFound.odlaw} />
            </CharacterImageWrapper>
            <CharacterImageWrapper>
              <Check src={CheckSvg} showCheck={charactersFound.whitebeard} />
              <CharacterImage src={Whitebeard} isGray={charactersFound.whitebeard} />
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
