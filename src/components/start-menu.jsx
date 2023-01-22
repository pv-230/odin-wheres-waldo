import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header1, Header2, Text, Button, Image } from '../common/common-styles';
import Waldo from '../images/characters/waldo-full.webp';
import Wenda from '../images/characters/wenda-full.webp';
import Odlaw from '../images/characters/odlaw-full.webp';
import Whitebeard from '../images/characters/whitebeard-full.webp';
import Beach from '../images/scenes/small/on-the-beach-small.webp';
import Ski from '../images/scenes/small/ski-slopes-small.webp';
import Sports from '../images/scenes/small/sports-stadium-small.webp';

const StyledStartMenu = styled.div`
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

const SceneSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 352px;
  padding: 20px 0;
  background-color: #333;
  color: var(--light-color);
  border-radius: 5px;
`;

const SceneTitle = styled(Text)`
  font-size: 1.5rem;
  font-style: italic;
  width: 100%;
  text-align: center;
`;

const SceneButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SceneButton = styled(Button)`
  border: none;
  outline: ${(props) => (props.selected ? '2px solid greenyellow' : '2px solid darkgray')};
  box-shadow: ${(props) => (props.selected ? '0px 0px 20px #dad600;' : 'none')};
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
    background-color: greenyellow;
  }

  &:active {
    background-color: lawngreen;
  }
`;

//-------------------------------------------------------------------------------------------------

function StartMenu({ scene, handleSceneSelection, startGame }) {
  return (
    <StyledStartMenu>
      <Header1>Where&apos;s Waldo?</Header1>
      <Text>How fast can you find these characters?</Text>

      <CharacterImages>
        <img src={Waldo} alt="Waldo" />
        <img src={Wenda} alt="Wenda" />
        <img src={Odlaw} alt="Odlaw" />
        <img src={Whitebeard} alt="Whitebeard" />
      </CharacterImages>

      <SceneSelection>
        <Header2>Choose a scene</Header2>
        <SceneButtons>
          <SceneButton data-scene="0" selected={scene.id === 0} onClick={handleSceneSelection}>
            <Image src={Beach} alt="On the Beach" />
          </SceneButton>
          <SceneButton data-scene="1" selected={scene.id === 1} onClick={handleSceneSelection}>
            <Image src={Ski} alt="Ski Slopes" />
          </SceneButton>
          <SceneButton data-scene="2" selected={scene.id === 2} onClick={handleSceneSelection}>
            <Image src={Sports} alt="Sports Stadium" />
          </SceneButton>
        </SceneButtons>
        <SceneTitle>{scene.title}</SceneTitle>
      </SceneSelection>

      <ActionButtons>
        <ActionButton type="button" onClick={startGame}>
          Start
        </ActionButton>
        <ActionButton type="button">Leaderboard</ActionButton>
      </ActionButtons>
    </StyledStartMenu>
  );
}

StartMenu.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  handleSceneSelection: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default StartMenu;
