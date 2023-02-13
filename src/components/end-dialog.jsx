import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Text, Button, StopButton, Spinner } from '../common/common-styles';
import db from '../firebase';

const StyledEndDialog = styled.div`
  display: ${(props) => (props.showEndDialog ? 'flex' : 'none')};
  flex-direction: column;
  width: 320px;
  position: absolute;
  top: calc(50vh - 150px);
  left: calc(50vw - 160px);
  background-color: var(--light-color);
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: center;
  background-color: crimson;
  width: 100%;
  padding: 10px 0;
  border-left: 1px solid var(--dark-color);
  border-top: 1px solid var(--dark-color);
  border-right: 1px solid var(--dark-color);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
  height: 100%;
  border-left: 1px solid var(--dark-color);
  border-bottom: 1px solid var(--dark-color);
  border-right: 1px solid var(--dark-color);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const NameInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Enter your name',
  maxLength: '20',
})`
  display: ${(props) => (props.showNameInput ? 'initial' : 'none')};
  width: 20ch;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 137px;
  background-color: ${(props) => (props.disabled ? 'lightgray' : 'greenyellow')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background-color: lawngreen;
  }

  &:active:not(:disabled) {
    background-color: greenyellow;
  }
`;

const ButtonSpinner = styled(Spinner)`
  width: 16px;
  height: 16px;
  border: 3px solid var(--light-color);
  border-bottom: 3px solid cornflowerblue;
`;

//-------------------------------------------------------------------------------------------------

function EndDialog({ scene, gameOver, seconds, minutes, stopGame }) {
  // Input states
  const [dynamicDialogText, setDynamicDialogText] = useState(
    'Submit your score to the leaderboard!'
  );
  const [showNameInput, setShowNameInput] = useState(true);
  const [nameInputValue, setNameInputValue] = useState('');

  // Button states
  const [submitButtonText, setSubmitButtonText] = useState('Submit');
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  var secondsText = 'second';
  var minutesText = 'minute';

  if (seconds === 0 || seconds > 1) {
    secondsText = 'seconds';
  }

  if (minutes > 1) {
    minutesText = 'minutes';
  }

  /**
   * Disables the submit button if name input is empty.
   */
  useEffect(() => {
    if (nameInputValue) {
      setSubmitIsDisabled(false);
    } else {
      setSubmitIsDisabled(true);
    }
  }, [nameInputValue]);

  /**
   * Event handler for submitting user scores.
   */
  async function handleSubmit() {
    var sceneDocName;

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

    const userCollection = collection(db, 'leaderboard', sceneDocName, 'users');

    try {
      setShowSpinner(true);
      setSubmitIsDisabled(true);

      await addDoc(userCollection, {
        name: nameInputValue,
        seconds,
        minutes,
        timestamp: serverTimestamp(),
      });

      setShowSpinner(false);
      setShowNameInput(false);
      setDynamicDialogText('Your score has been submitted.');
      setSubmitButtonText('Submitted');
    } catch (e) {
      setShowSpinner(false);
      setSubmitIsDisabled(false);
      setDynamicDialogText(e.message);
    }
  }

  return (
    <StyledEndDialog showEndDialog={gameOver}>
      <DialogHeader>
        <Text style={{ fontSize: '2rem', color: 'var(--light-color)' }}>Congratulations!</Text>
      </DialogHeader>
      <DialogContent>
        <ScoreWrapper>
          <Text style={{ fontSize: '1.2rem' }}>You found all the characters in</Text>
          <Text style={{ fontSize: '1.2rem' }}>
            {minutes > 0 ? `${minutes} ${minutesText}` : null} {seconds} {secondsText}
          </Text>
        </ScoreWrapper>
        <Text style={{ textAlign: 'center' }}>{dynamicDialogText}</Text>
        <NameInput
          value={nameInputValue}
          showNameInput={showNameInput}
          onChange={(e) => setNameInputValue(e.target.value)}
        />
        <ButtonWrapper>
          <SubmitButton disabled={submitIsDisabled} onClick={handleSubmit}>
            {showSpinner ? <ButtonSpinner /> : submitButtonText}
          </SubmitButton>
          <StopButton onClick={stopGame}>Main Menu</StopButton>
        </ButtonWrapper>
      </DialogContent>
    </StyledEndDialog>
  );
}

EndDialog.propTypes = {
  scene: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageSrc: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  gameOver: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  stopGame: PropTypes.func.isRequired,
};

export default EndDialog;
