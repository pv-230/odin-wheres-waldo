import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledScene = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 175px);
  overflow: hidden;
  background-color: var(--dark-color);
`;

const SceneImage = styled.img.attrs(({ translateCoords }) => ({
  style: {
    translate: `${translateCoords.x}px ${translateCoords.y}px`,
  },
}))`
  cursor: ${(props) => (props.isPanning ? 'grab' : 'pointer')};
  width: 3000px;
  height: 1926px;
`;

function Scene({ scene }) {
  const [isPanning, setIsPanning] = useState(false);
  const [translateCoords, setTranslateCoords] = useState({ x: 0, y: 0 });

  /**
   * Event handler for starting image panning.
   * @param {Event} e
   */
  function handleMouseDown(e) {
    e.preventDefault(); // Prevent image dragging
    setIsPanning(true);
  }

  /**
   * Event handler for image panning that updates the image translation offset.
   * @param {Event} e
   */
  function handleMouseMove(e) {
    if (isPanning) {
      setTranslateCoords((oldCoords) => ({
        x: oldCoords.x + e.movementX,
        y: oldCoords.y + e.movementY,
      }));
    }
  }

  /**
   * Event handler for stopping image panning.
   */
  function handleMouseUp() {
    setIsPanning(false);
  }

  return (
    <StyledScene>
      <SceneImage
        src={scene.image}
        alt={scene.title}
        translateCoords={translateCoords}
        isPanning={isPanning}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </StyledScene>
  );
}

Scene.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Scene;