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
  /* background-color: var(--dark-color); */
`;

const SceneImage = styled.img.attrs(({ translateCoords, scaleVal }) => ({
  style: {
    translate: `${translateCoords.x}px ${translateCoords.y}px`,
    scale: `${scaleVal}`,
  },
}))`
  cursor: ${(props) => (props.isPanning ? 'grab' : 'pointer')};
  width: 3000px;
  height: 1962px;
`;

function SceneViewport({ scene }) {
  const [isPanning, setIsPanning] = useState(false);
  const [translateCoords, setTranslateCoords] = useState({ x: 0, y: 0 });
  const [scaleVal, setScaleVal] = useState(1);
  const imageRef = useRef(null);
  const sceneRef = useRef(null);

  /**
   * Scales the scene image so that it takes up close to the full height of the scene viewport.
   * Original image coordinates are preserved by applying the reverse scale operation:
   *     originalCoordVal = scaledCoordVal / currentScaleVal
   */
  useEffect(() => {
    const sceneViewportHeight = sceneRef.current.offsetHeight;
    const sceneImageHeight = imageRef.current.offsetHeight;
    var tempImageHeight = sceneImageHeight;
    var newImageScaleVal = 1;

    // Attempts to find the optimal scale value with a step value of 0.1 so that the scene image
    // is scaled to fit the viewport.
    if (sceneImageHeight > sceneViewportHeight) {
      // Scales image down
      while (tempImageHeight > sceneViewportHeight && newImageScaleVal > 0.1) {
        tempImageHeight = sceneImageHeight;
        newImageScaleVal -= 0.1;
        tempImageHeight *= newImageScaleVal;
      }
    } else if (sceneImageHeight < sceneViewportHeight) {
      // Scales image up
      while (tempImageHeight < sceneViewportHeight && newImageScaleVal < 4) {
        tempImageHeight = sceneImageHeight;
        newImageScaleVal += 0.1;
        tempImageHeight *= newImageScaleVal;
      }
    }
    setScaleVal(newImageScaleVal);
  }, []);

  /**
   * Debugging function for reading mouse coords.
   */
  function printMouseCoords(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const scaledMouseCoords = {
      x: Math.round(e.clientX - rect.x),
      y: Math.round(e.clientY - rect.y),
    };

    const unscaledMouseCoords = {
      x: Math.round(scaledMouseCoords.x / scaleVal),
      y: Math.round(scaledMouseCoords.y / scaleVal),
    };

    console.log(`scaledMouseCoords: [${scaledMouseCoords.x}, ${scaledMouseCoords.y}]`);
    console.log(`unscaledMouseCoords: [${unscaledMouseCoords.x}, ${unscaledMouseCoords.y}]`);
  }

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
    printMouseCoords(e);
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
    setScaleVal((prevScaleValue) => prevScaleValue + scaleChange);
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
