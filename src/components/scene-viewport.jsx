import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { doc, getFirestore, getDoc } from 'firebase/firestore';

import { Text, Button, Image } from '../common/common-styles';
import { db } from '../firebase';
import Waldo from '../images/characters/small/waldo-small.webp';
import Wenda from '../images/characters/small/wenda-small.webp';
import Odlaw from '../images/characters/small/odlaw-small.webp';
import Whitebeard from '../images/characters/small/whitebeard-small.webp';

const CHAR_SELECTION_WIDTH = 300;
const CHAR_SELECTION_HEIGHT = 115;
const TARGET_BOX_SIZE = 100;
const FIRESTORE = getFirestore(db);

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
  width: ${(props) => props.sceneWidth};
  height: ${(props) => props.sceneHeight};
`;

const CharacterSelection = styled.div`
  display: ${(props) => (props.showSelectionBox ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: ${CHAR_SELECTION_WIDTH}px;
  height: ${CHAR_SELECTION_HEIGHT}px;
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

const TargetBox = styled.div`
  display: ${(props) => (props.showTargetBox ? 'block' : 'none')};
  width: ${(props) => TARGET_BOX_SIZE * props.scaleVal}px;
  height: ${(props) => TARGET_BOX_SIZE * props.scaleVal}px;
  border: 3px solid crimson;
  border-radius: 5px;
  position: absolute;
  top: ${(props) => props.topVal}px;
  left: ${(props) => props.leftVal}px;
`;

//-------------------------------------------------------------------------------------------------

function SceneViewport({ scene, topBarHeight }) {
  // Panning states
  const [isPanning, setIsPanning] = useState(false);
  const [translateCoords, setTranslateCoords] = useState({ x: 0, y: 0 });

  // Zoom state
  const [scaleVal, setScaleVal] = useState(1);

  // Character selection and target box states
  const [showSelectionBox, setShowSelectionBox] = useState(false);
  const [selectionBoxCoords, setSelectionBoxCoords] = useState({ x: 0, y: 0 });
  const [oldTranslateCoords, setOldTranslateCoords] = useState({ x: 0, y: 0 });
  const [showTargetBox, setShowTargetBox] = useState(false);
  const [targetBoxCoords, setTargetBoxCoords] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Ref used for initial image scaling
  const sceneRef = useRef(null);

  /**
   * Scales the scene image so that it takes up close to the full height of the scene viewport.
   * Original image coordinates are preserved by applying the reverse scale operation:
   *     originalCoordVal = scaledCoordVal / currentScaleVal
   */
  useEffect(() => {
    const sceneViewportHeight = sceneRef.current.clientHeight;
    const sceneImageHeight = scene.height;
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
  }, [scene.height]);

  /**
   * Event handler for starting image panning.
   * @param {Event} e
   */
  function handleMouseDown(e) {
    e.preventDefault(); // Prevent image dragging
    setIsPanning(true);
    setOldTranslateCoords(translateCoords);
    setShowSelectionBox(false);
    setShowTargetBox(false);
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
    setShowSelectionBox(false);
    setShowTargetBox(false);
  }

  /**
   * Event handler for showing the character selection window.
   * @param {Event} e
   */
  function handleClick(e) {
    // Prevents showing the selection window if user has panned
    if (translateCoords.x !== oldTranslateCoords.x && translateCoords.y !== oldTranslateCoords.y) {
      return;
    }

    // Value is used to keep target box size consistent with iamge size
    const scaledTargetBoxSize = TARGET_BOX_SIZE * scaleVal;

    // Selection window measurements
    var selectionX = e.clientX - CHAR_SELECTION_WIDTH / 2;
    var selectionY = e.clientY - topBarHeight - CHAR_SELECTION_HEIGHT - scaledTargetBoxSize / 2;
    const distanceToRightEdge = sceneRef.current.clientWidth - selectionX;
    const distanceToLeftEdge = e.clientX;
    const distanceToTopEdge = e.clientY - topBarHeight;

    // Target box measurements
    const targetX = e.clientX - scaledTargetBoxSize / 2;
    const targetY = e.clientY - topBarHeight - scaledTargetBoxSize / 2;

    // Mouse coordinates adjusted for scaling
    const sceneImageRect = e.currentTarget.getBoundingClientRect();
    const unscaledMouseCoords = {
      x: Math.round((e.clientX - sceneImageRect.x) / scaleVal),
      y: Math.round((e.clientY - sceneImageRect.y) / scaleVal),
    };

    // Shifts the selection window left if there is not enough space to the right
    if (distanceToRightEdge < CHAR_SELECTION_WIDTH) {
      selectionX -= CHAR_SELECTION_WIDTH - distanceToRightEdge;
    }

    // Shifts the selection window right if there is not enough space to the left
    if (distanceToLeftEdge < CHAR_SELECTION_WIDTH / 2) {
      selectionX += CHAR_SELECTION_WIDTH / 2 - distanceToLeftEdge;
    }

    // Shifts the selection window below the target box if there is not enough space above
    if (distanceToTopEdge < CHAR_SELECTION_HEIGHT + scaledTargetBoxSize / 2) {
      selectionY += CHAR_SELECTION_HEIGHT + scaledTargetBoxSize;
    }

    setSelectionBoxCoords({ x: selectionX, y: selectionY });
    setTargetBoxCoords({ x: targetX, y: targetY });
    setMouseCoords(unscaledMouseCoords);
    setShowSelectionBox(true);
    setShowTargetBox(true);
  }

  /**
   * Validates correct location of character selection.
   * @param {Event} e
   */
  async function handleSelection(e) {
    var sceneDocName;
    const characterDocName = e.currentTarget.dataset.character;

    // Sets the appropriate scene name that is expected in the database
    if (scene.id === 0) {
      sceneDocName = 'beach';
    } else if (scene.id === 1) {
      sceneDocName = 'slopes';
    } else if (scene.id === 2) {
      sceneDocName = 'stadium';
    } else {
      throw new Error('handleSelection(): Invalid scene ID');
    }

    const characterDoc = doc(FIRESTORE, 'scenes', sceneDocName, 'characters', characterDocName);
    const coordsField = await (await getDoc(characterDoc)).get('coords');

    // Checks if the targeted location contains the selected character
    if (
      mouseCoords.x >= coordsField[0] - 50 &&
      mouseCoords.x <= coordsField[0] + 50 &&
      mouseCoords.y >= coordsField[1] - 50 &&
      mouseCoords.y <= coordsField[1] + 50
    ) {
      console.log('correct');
    } else {
      console.log('incorrect');
    }
  }

  return (
    <StyledSceneViewport ref={sceneRef}>
      <SceneImage
        src={scene.image}
        alt={scene.title}
        isPanning={isPanning}
        translateCoords={translateCoords}
        scaleVal={scaleVal}
        sceneWidth={scene.width}
        sceneHeight={scene.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleClick}
      />

      <CharacterSelection
        showSelectionBox={showSelectionBox}
        leftVal={selectionBoxCoords.x}
        topVal={selectionBoxCoords.y}
      >
        <Text>Who did you find?</Text>
        <CharacterButtons>
          <CharacterButton data-character="waldo" onClick={handleSelection}>
            <Image src={Waldo} alt="Waldo" />
          </CharacterButton>
          <CharacterButton data-character="wenda" onClick={handleSelection}>
            <Image src={Wenda} alt="Wenda" />
          </CharacterButton>
          <CharacterButton data-character="odlaw" onClick={handleSelection}>
            <Image src={Odlaw} alt="Odlaw" />
          </CharacterButton>
          <CharacterButton data-character="whitebeard" onClick={handleSelection}>
            <Image src={Whitebeard} />
          </CharacterButton>
        </CharacterButtons>
      </CharacterSelection>

      <TargetBox
        showTargetBox={showTargetBox}
        leftVal={targetBoxCoords.x}
        topVal={targetBoxCoords.y}
        scaleVal={scaleVal}
      />
    </StyledSceneViewport>
  );
}

SceneViewport.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  topBarHeight: PropTypes.number.isRequired,
};

export default SceneViewport;
