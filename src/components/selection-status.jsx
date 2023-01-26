import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from '../common/common-styles';

const StatusText = styled(Text)`
  font-size: 1.5rem;
  color: var(--light-color);
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 5px solid var(--light-color);
  border-radius: 50%;
  border-bottom: 5px solid cornflowerblue;
  animation: 500ms linear infinite spinner;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

//-------------------------------------------------------------------------------------------------

function SelectionStatus({ showSpinner, isCorrect, selectedCharacter }) {
  var statusText = '';
  var selectedCharacterCapitalized = selectedCharacter[0]
    .toUpperCase()
    .concat(selectedCharacter.slice(1));

  if (isCorrect) {
    statusText = `You found ${selectedCharacterCapitalized}!`;
  } else {
    statusText = `${selectedCharacterCapitalized} isn't there!`;
  }

  return showSpinner ? <Spinner /> : <StatusText>{statusText}</StatusText>;
}

SelectionStatus.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  selectedCharacter: PropTypes.string.isRequired,
};

export default SelectionStatus;
