import styled from 'styled-components';

import { Text, Button, Image } from '../common/common-styles';

const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
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

const RestartButton = styled(Button)`
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

//-------------------------------------------------------------------------------------------------

function Game() {
  return (
    <StyledGame>
      <TopBar>
        <TopBarContent>
          <TimerBar>
            <Timer>
              <TimerText>00:00</TimerText>
            </Timer>
            <RestartButton>Restart</RestartButton>
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
      <Image />
    </StyledGame>
  );
}

export default Game;
