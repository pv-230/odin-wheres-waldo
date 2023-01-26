import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from '../common/common-styles';

const StatusText = styled(Text)`
  font-size: 1.5rem;
  /* color: ${(props) => (props.isCorrect ? 'green' : 'red')}; */
  color: var(--light-color);
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

  return showSpinner ? 'spinner' : <StatusText isCorrect={isCorrect}>{statusText}</StatusText>;
}

SelectionStatus.propTypes = {
  showSpinner: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  selectedCharacter: PropTypes.string.isRequired,
};

export default SelectionStatus;
