import styled from 'styled-components';
import PropTypes from 'prop-types';

import SceneViewport from './scene-viewport';
import { Text, Button, Image } from '../common/common-styles';
import Waldo from '../images/characters/small/waldo-small.webp';
import Wenda from '../images/characters/small/wenda-small.webp';
import Odlaw from '../images/characters/small/odlaw-small.webp';
import Whitebeard from '../images/characters/small/whitebeard-small.webp';

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
  height: 175px;
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

const CharacterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CharacterButton = styled(Button)`
  padding: 0;
  width: 64px;
  height: 64px;
  background-color: cornflowerblue;
`;

//-------------------------------------------------------------------------------------------------

function Game({ scene, stopGame }) {
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
          <CharacterButtons>
            <CharacterButton>
              <Image src={Waldo} />
            </CharacterButton>
            <CharacterButton>
              <Image src={Wenda} />
            </CharacterButton>
            <CharacterButton>
              <Image src={Odlaw} />
            </CharacterButton>
            <CharacterButton>
              <Image src={Whitebeard} />
            </CharacterButton>
          </CharacterButtons>
        </TopBarContent>
      </TopBar>
      <SceneViewport scene={scene} />
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
