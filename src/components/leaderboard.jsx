import styled from 'styled-components';

import GlobalStyle from '../common/global-style';

const StyledLeaderboard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--dark-color);
  background-color: var(--light-color);
`;

const Locations = styled.div`
  display: flex;
  flex-direction: column;
`;

const Scores = styled.div`
  display: flex;
  flex-direction: column;
`;

//-------------------------------------------------------------------------------------------------

function Leaderboard() {
  return (
    <>
      <GlobalStyle />
      <StyledLeaderboard>
        <Locations>Locations</Locations>
        <Scores>Scores</Scores>
      </StyledLeaderboard>
    </>
  );
}

export default Leaderboard;
