import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledScene = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 100%;
  max-height: calc(100vh - 175px);
  overflow: auto;
`;

function Scene({ scene }) {
  return (
    <StyledScene>
      <img src={scene.image} alt={scene.title} />
    </StyledScene>
  );
}

Scene.propTypes = {
  scene: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Scene;
