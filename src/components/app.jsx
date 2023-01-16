import { useState } from 'react';
import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import Start from './start';
import Game from './game';

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

  function startGame() {
    setGameStarted(true);
  }

  return (
    <>
      <GlobalStyle />
      <StyledApp>{gameStarted ? <Game /> : <Start startGame={startGame} />}</StyledApp>
    </>
  );
}

export default App;
