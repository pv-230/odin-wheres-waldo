import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text, Button, StopButton } from '../common/common-styles';

const StyledEndDialog = styled.div`
  display: ${(props) => (props.showEndDialog ? 'flex' : 'none')};
  flex-direction: column;
  width: 320px;
  height: 300px;
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
  background-color: greenyellow;

  &:hover {
    background-color: lawngreen;
  }

  &:active {
    background-color: greenyellow;
  }
`;

function EndDialog({ gameOver, seconds, minutes, stopGame }) {
  var secondsText = 'second';
  var minutesText = 'minute';

  if (seconds === 0 || seconds > 1) {
    secondsText = 'seconds';
  }

  if (minutes > 1) {
    minutesText = 'minutes';
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
        <Text style={{ textAlign: 'center' }}>Submit your score to the leaderboards!</Text>
        <NameInput />
        <ButtonWrapper>
          <SubmitButton>Submit</SubmitButton>
          <StopButton onClick={stopGame}>Main Menu</StopButton>
        </ButtonWrapper>
      </DialogContent>
    </StyledEndDialog>
  );
}

EndDialog.propTypes = {
  gameOver: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  stopGame: PropTypes.func.isRequired,
};

export default EndDialog;
