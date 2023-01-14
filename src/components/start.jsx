import styled from 'styled-components';

const StartWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: 0;
`;

function Start() {
  return (
    <StartWrapper>
      <Header>Where's Waldo?</Header>

      <p>How fast can you find these characters?</p>

      <div>
        {/* TODO: Add character names to alt text */}
        <img src="" alt="First character" />
        <img src="" alt="Second character" />
        <img src="" alt="Third character" />
        <img src="" alt="Fourth character" />
      </div>

      <div>
        <p>Choose a location</p>
        <button type="button">
          {/* TODO: Add location names to alt text */}
          <img src="" alt="First location" />
        </button>
        <button type="button">
          {/* TODO: Add location names to alt text */}
          <img src="" alt="Second location" />
        </button>
        <button type="button">
          {/* TODO: Add location names to alt text */}
          <img src="" alt="Third location" />
        </button>
      </div>

      <div>
        <button type="button">Start</button>
        <button type="button">Leaderboard</button>
      </div>
    </StartWrapper>
  );
}

export default Start;
