import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import Start from './start';

const StyledApp = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--dark-color);
  background-color: var(--light-color);
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Start />
      </StyledApp>
    </>
  );
}

export default App;
