import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text, Button, Image } from '../common/common-styles';

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  height: 175px;
`;

const TopBarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  padding: 20px;
`;

const TimerBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Timer = styled.div`
  padding: 5px;
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

  background-color: tomato;
  height: 100%;
`;

const CharacterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CharacterButton = styled(Button)`
  border: none;
  border-radius: 0;
  padding: 0;
  width: 64px;
  height: 64px;
`;

const Scene = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 100%;
  max-height: calc(100vh - 175px);
  overflow: auto;
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
              <Image />
            </CharacterButton>
            <CharacterButton>
              <Image />
            </CharacterButton>
            <CharacterButton>
              <Image />
            </CharacterButton>
            <CharacterButton>
              <Image />
            </CharacterButton>
          </CharacterButtons>
        </TopBarContent>
      </TopBar>
      <Scene>
        <img src={scene.image} alt={scene.title} />
      </Scene>
    </StyledGame>
  );
}

Game.propTypes = {
  scene: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  stopGame: PropTypes.func.isRequired,
};

export default Game;
