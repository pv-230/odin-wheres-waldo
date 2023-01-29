import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header1, Header2, Text, Button, Image } from '../common/common-styles';
import { charactersFull, scenesCropped } from '../data/image-maps';

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
        <img src={charactersFull.get('waldo')} alt="Waldo" />
        <img src={charactersFull.get('wenda')} alt="Wenda" />
        <img src={charactersFull.get('odlaw')} alt="Odlaw" />
        <img src={charactersFull.get('whitebeard')} alt="Whitebeard" />
      </CharacterImages>

      <SceneSelection>
        <Header2>Choose a scene</Header2>
        <SceneButtons>
          <SceneButton data-scene="0" selected={scene.id === 0} onClick={handleSceneSelection}>
            <Image src={scenesCropped.get('beach')} alt="On the Beach" />
          </SceneButton>
          <SceneButton data-scene="1" selected={scene.id === 1} onClick={handleSceneSelection}>
            <Image src={scenesCropped.get('slopes')} alt="Ski Slopes" />
          </SceneButton>
          <SceneButton data-scene="2" selected={scene.id === 2} onClick={handleSceneSelection}>
            <Image src={scenesCropped.get('stadium')} alt="Sports Stadium" />
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
