import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { icons } from '../data/image-maps';

const Header1 = styled.h1`
  margin: 0;
`;

const Header2 = styled.h2`
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button.attrs(() => ({ type: 'button' }))`
  background-color: var(--light-color);
  color: var(--dark-color);
  border: 2px solid var(--dark-color);
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
`;

const Image = styled.img.attrs(() => ({ draggable: 'false' }))`
  width: 100%;
  height: 100%;
  user-select: none;
`;

const CharacterImage = styled(Image)`
  border-radius: 5px;
  background-color: cornflowerblue;
  filter: ${(props) => (props.isGray ? 'grayscale(100%)' : 'none')};
`;

const Check = styled(Image).attrs(() => ({ src: icons.get('check') }))`
  position: absolute;
  display: ${(props) => (props.showCheck ? 'block' : 'none')};
  z-index: 1;
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

const StopButton = styled(Button)`
  &:hover {
    background-color: orangered;
  }

  &:active {
    background-color: tomato;
  }

  background-color: tomato;
  height: 100%;
`;

const StyledLink = styled(Link)`
  background-color: var(--light-color);
  color: var(--dark-color);
  border: 2px solid var(--dark-color);
  border-radius: 5px;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;

  &:visited {
    color: initial;
  }

  &:hover {
    background-color: initial;
  }

  &:active {
    background-color: initial;
  }
`;

export {
  Header1,
  Header2,
  Text,
  Button,
  Image,
  CharacterImage,
  Check,
  Spinner,
  StopButton,
  StyledLink,
};
