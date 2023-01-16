import { useState } from 'react';
import styled from 'styled-components';
import { Header, Text, Button } from '../common/common-styles';

const StyledStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`;

const CharacterImages = styled.div`
  display: flex;
  gap: 10px;
`;

const CharacterImage = styled.img`
  width: 64px;
  height: 96px;
`;

const LocationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const LocationButton = styled(Button)`
  border: none;
  outline: ${(props) => (props.selected ? '2px solid limegreen' : 'none')};
  border-radius: 0;
  padding: 0;
  width: 64px;
  height: 64px;
`;

const LocationImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled(Button)`
  &:hover {
    background-color: lightsalmon;
  }

  &:active {
    background-color: salmon;
  }
`;

///////////////////////////////////////////////////////////////////////////////////////////////////

function Start({ startGame }) {
  // TODO: Update location names
  const locations = {
    0: 'First location',
    1: 'Second location',
    2: 'Third location',
  };

  const [location, setLocation] = useState({
    value: 0,
    name: locations[0],
  });

  /**
   * Event handler for location selections.
   * @param {Event} e
   */
  function handleLocationSelection(e) {
    const locValue = Number(e.currentTarget.dataset.location);
    setLocation({
      name: locations[locValue],
      value: locValue,
    });
  }

  return (
    <StyledStart>
      <Header>Where's Waldo?</Header>

      <Text>How fast can you find these characters?</Text>

      {/* TODO: Add character names to alt text */}
      <CharacterImages>
        <CharacterImage src="" />
        <CharacterImage src="" />
        <CharacterImage src="" />
        <CharacterImage src="" />
      </CharacterImages>

      <Text>Choose a location:</Text>

      {/* TODO: Add location names to image alt text */}
      <LocationButtons>
        <LocationButton
          data-location="0"
          selected={location.value === 0}
          onClick={handleLocationSelection}
        >
          <LocationImage src="" />
        </LocationButton>

        <LocationButton
          data-location="1"
          selected={location.value === 1}
          onClick={handleLocationSelection}
        >
          <LocationImage src="" />
        </LocationButton>

        <LocationButton
          data-location="2"
          selected={location.value === 2}
          onClick={handleLocationSelection}
        >
          <LocationImage src="" />
        </LocationButton>
      </LocationButtons>

      <Text>{location.name}</Text>

      <ActionButtons>
        <ActionButton type="button" onClick={startGame}>
          Start
        </ActionButton>
        <ActionButton type="button">Leaderboard</ActionButton>
      </ActionButtons>
    </StyledStart>
  );
}

export default Start;
