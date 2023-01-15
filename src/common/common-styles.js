import styled from 'styled-components';

const Header = styled.h1`
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
`;

const Button = styled.button.attrs(() => ({ type: 'button' }))`
  background-color: var(--light-color);
  border: 2px solid var(--dark-color);
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
`;

export { Header, Text, Button };
