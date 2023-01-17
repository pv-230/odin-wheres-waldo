import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header, Text, Button, Image } from '../common/common-styles';
import Waldo from '../images/characters/waldo-full.webp';
import Wenda from '../images/characters/wenda-full.webp';
import Odlaw from '../images/characters/odlaw-full.webp';
import Whitebeard from '../images/characters/whitebeard-full.webp';
import Beach from '../images/scenes/small/on-the-beach-small.webp';
import Ski from '../images/scenes/small/ski-slopes-small.webp';
import Sports from '../images/scenes/small/sports-stadium-small.webp';

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
`;

const LocationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const LocationButton = styled(Button)`
  border: none;
  outline: ${(props) => (props.selected ? '2px solid limegreen' : '2px solid var(--dark-color)')};
  border-radius: 0;
  padding: 0;
  width: 100px;
  height: 100px;
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
        <img src={Waldo} alt="Waldo" />
        <img src={Wenda} alt="Wenda" />
        <img src={Odlaw} alt="Odlaw" />
        <img src={Whitebeard} alt="Whitebeard" />
      </CharacterImages>

      <Text>Choose a scene:</Text>

      {/* TODO: Add location names to image alt text */}
      <LocationButtons>
        <LocationButton data-scene="0" selected={scene.id === 0} onClick={handleSceneSelection}>
          <Image src={Beach} alt="On the Beach" />
        </LocationButton>

        <LocationButton data-scene="1" selected={scene.id === 1} onClick={handleSceneSelection}>
          <Image src={Ski} alt="Ski Slopes" />
        </LocationButton>

        <LocationButton data-scene="2" selected={scene.id === 2} onClick={handleSceneSelection}>
          <Image src={Sports} alt="Sports Stadium" />
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
