import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSceneViewport = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 175px);
  overflow: hidden;
  background-color: var(--dark-color);
`;

const SceneImage = styled.img.attrs(({ translateCoords, scaleVal }) => ({
  style: {
    translate: `${translateCoords.x}px ${translateCoords.y}px`,
    scale: `${scaleVal}`,
  },
}))`
  cursor: ${(props) => (props.isPanning ? 'grab' : 'pointer')};
`;

function SceneViewport({ scene }) {
  const [isPanning, setIsPanning] = useState(false);
  const [translateCoords, setTranslateCoords] = useState({ x: 0, y: 0 });
  const [scaleVal, setScaleVal] = useState(1);
  const imageRef = useRef(null);
  const sceneRef = useRef(null);

  /**
   * Scales the scene image so that it takes up close to the full height of the scene container.
   */
  useEffect(() => {
    const sceneContainerHeight = sceneRef.current.offsetHeight;
    const sceneImageHeight = imageRef.current.offsetHeight;
    var newImageHeight = sceneImageHeight;
    var newImageScale = 1;

    while (newImageHeight > sceneContainerHeight && newImageScale > 0) {
      newImageHeight = sceneImageHeight;
      newImageScale -= 0.1;
      newImageHeight *= newImageScale;
    }
    setScaleVal(newImageScale);
  }, []);

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
    // const rect = e.currentTarget.getBoundingClientRect();
    // const sceneMouseCoords = {
    //   x: Math.round(e.clientX - rect.x),
    //   y: Math.round(e.clientY - rect.y),
    // };
    // console.log(sceneMouseCoords);

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

  /**
   * Event handler for zooming in or out.
   */
  function handleWheel(e) {
    const SCALE_STEP = 0.1;
    const scaleChange = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    const newScaleVal = scaleVal + scaleChange;

    setScaleVal(newScaleVal);

    // const rect = e.currentTarget.getBoundingClientRect();

    // const sceneMouseCoords = {
    //   x: Math.round(e.clientX - rect.x),
    //   y: Math.round(e.clientY - rect.y),
    // };
    // console.log(`preZoomPoint: ${sceneMouseCoords.x}, ${sceneMouseCoords.y}`);

    // const scaledMouseCoords = {
    //   x: Math.round((sceneMouseCoords.x / scaleVal) * newZoom),
    //   y: Math.round((sceneMouseCoords.y / scaleVal) * newZoom),
    // };
    // console.log(`postZoomPoint: ${scaledMouseCoords.x}, ${scaledMouseCoords.y}`);
  }

  return (
    <StyledSceneViewport ref={sceneRef}>
      <SceneImage
        src={scene.image}
        alt={scene.title}
        isPanning={isPanning}
        translateCoords={translateCoords}
        scaleVal={scaleVal}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        ref={imageRef}
      />
    </StyledSceneViewport>
  );
}

SceneViewport.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default SceneViewport;
