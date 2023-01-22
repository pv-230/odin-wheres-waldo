import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text, Button, Image } from '../common/common-styles';
import Waldo from '../images/characters/small/waldo-small.webp';
import Wenda from '../images/characters/small/wenda-small.webp';
import Odlaw from '../images/characters/small/odlaw-small.webp';
import Whitebeard from '../images/characters/small/whitebeard-small.webp';

const StyledSceneViewport = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 175px);
  overflow: hidden;
  position: relative;
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

const CharacterSelection = styled.div`
  display: ${(props) => (props.showSelection ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 300px;
  background-color: var(--dark-color);
  color: var(--light-color);
  border-radius: 5px;
  position: absolute;
  top: ${(props) => props.topVal}px;
  left: ${(props) => props.leftVal}px;
`;

const CharacterButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CharacterButton = styled(Button)`
  padding: 0;
  width: 64px;
  height: 64px;
  background-color: cornflowerblue;
`;

//-------------------------------------------------------------------------------------------------

function SceneViewport({ scene, topBarHeight }) {
  // Panning states
  const [isPanning, setIsPanning] = useState(false);
  const [translateCoords, setTranslateCoords] = useState({ x: 0, y: 0 });

  // Zoom state
  const [scaleVal, setScaleVal] = useState(1);

  // Character selection states
  const [showSelection, setShowSelection] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState({ x: 0, y: 0 });
  const [oldTranslateCoords, setOldTranslateCoords] = useState({ x: 0, y: 0 });

  // Refs used for initial image scaling
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
  // function printMouseCoords(e) {
  //   const rect = e.currentTarget.getBoundingClientRect();

  //   const scaledMouseCoords = {
  //     x: Math.round(e.clientX - rect.x),
  //     y: Math.round(e.clientY - rect.y),
  //   };

  //   const unscaledMouseCoords = {
  //     x: Math.round(scaledMouseCoords.x / scaleVal),
  //     y: Math.round(scaledMouseCoords.y / scaleVal),
  //   };

  //   console.log(`scaledMouseCoords: [${scaledMouseCoords.x}, ${scaledMouseCoords.y}]`);
  //   console.log(`unscaledMouseCoords: [${unscaledMouseCoords.x}, ${unscaledMouseCoords.y}]`);
  // }

  /**
   * Event handler for starting image panning.
   * @param {Event} e
   */
  function handleMouseDown(e) {
    e.preventDefault(); // Prevent image dragging
    setIsPanning(true);
    setOldTranslateCoords(translateCoords);
    setShowSelection(false);
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

  /**
   * Event handler for zooming in or out.
   */
  function handleWheel(e) {
    const SCALE_STEP = 0.1;
    const scaleChange = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    setScaleVal((prevScaleValue) => prevScaleValue + scaleChange);
  }

  /**
   * Event handler for showing the character selection window.
   * @param {Event} e
   */
  function handleClick(e) {
    if (translateCoords.x !== oldTranslateCoords.x && translateCoords.y !== oldTranslateCoords.y) {
      // Prevents showing the selection window if user has panned
      return;
    }
    setSelectionCoords({ x: e.clientX, y: e.clientY - topBarHeight });
    setShowSelection(true);
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
        onClick={handleClick}
        ref={imageRef}
      />
      <CharacterSelection
        showSelection={showSelection}
        leftVal={selectionCoords.x}
        topVal={selectionCoords.y}
      >
        <Text>Who did you find?</Text>
        <CharacterButtons>
          <CharacterButton>
            <Image src={Waldo} />
          </CharacterButton>
          <CharacterButton>
            <Image src={Wenda} />
          </CharacterButton>
          <CharacterButton>
            <Image src={Odlaw} />
          </CharacterButton>
          <CharacterButton>
            <Image src={Whitebeard} />
          </CharacterButton>
        </CharacterButtons>
      </CharacterSelection>
    </StyledSceneViewport>
  );
}

SceneViewport.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  topBarHeight: PropTypes.number.isRequired,
};

export default SceneViewport;
