import styled from 'styled-components';

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

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export { Header1, Header2, Text, Button, Image };
