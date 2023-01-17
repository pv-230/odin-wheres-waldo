import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header, Text, Button } from '../common/common-styles';

const StyledStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const CharacterImages = styled.div`
  display: flex;
  gap: 10px;
`;

const CharacterImage = styled.img`
  width: 64px;
  height: 96px;
`;

const LocationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const LocationButton = styled(Button)`
  border: none;
  outline: ${(props) => (props.selected ? '2px solid limegreen' : 'none')};
  border-radius: 0;
  padding: 0;
  width: 64px;
  height: 64px;
`;

const LocationImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled(Button)`
  &:hover {
    background-color: lightsalmon;
  }

  &:active {
    background-color: salmon;
  }
`;

//-------------------------------------------------------------------------------------------------

function Start({ scene, handleSceneSelection, startGame }) {
  return (
    <StyledStart>
      <Header>Where&apos;s Waldo?</Header>

      <Text>How fast can you find these characters?</Text>

      {/* TODO: Add character names to alt text */}
      <CharacterImages>
        <CharacterImage src="" />
        <CharacterImage src="" />
        <CharacterImage src="" />
        <CharacterImage src="" />
      </CharacterImages>

      <Text>Choose a location:</Text>

      {/* TODO: Add location names to image alt text */}
      <LocationButtons>
        <LocationButton data-scene="0" selected={scene.id === 0} onClick={handleSceneSelection}>
          <LocationImage src="" alt="On the Beach" />
        </LocationButton>

        <LocationButton data-scene="1" selected={scene.id === 1} onClick={handleSceneSelection}>
          <LocationImage src="" alt="Ski Slopes" />
        </LocationButton>

        <LocationButton data-scene="2" selected={scene.id === 2} onClick={handleSceneSelection}>
          <LocationImage src="" alt="Sports Stadium" />
        </LocationButton>
      </LocationButtons>

      <Text>{scene.title}</Text>

      <ActionButtons>
        <ActionButton type="button" onClick={startGame}>
          Start
        </ActionButton>
        <ActionButton type="button">Leaderboard</ActionButton>
      </ActionButtons>
    </StyledStart>
  );
}

Start.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  handleSceneSelection: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default Start;
