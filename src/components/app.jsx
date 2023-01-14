import styled from 'styled-components';
import 'normalize.css';

import GlobalStyle from '../common/global-style';
import Start from './start';

const AppWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: var(--dark-font-color);
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Start />
      </AppWrapper>
    </>
  );
}

export default App;
