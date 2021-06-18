import styled from 'styled-components';

export const Input = styled.input`
  background-color: transparent;
  border: none;
  font-family: Industry;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.contrast};
  transition: all 200ms ease-out;

  border-bottom: 3px solid
    ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.secondarySoft
        : theme.colors.secondary};

  &:focus {
    border-bottom: 3px solid ${({ theme }) => theme.colors.accent};
  }

  &.filled {
    border-bottom: 3px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const SecondaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  font-family: Futura;
  font-size: 25px;
  text-transform: uppercase;
  color: white;
  border: 2.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 8px 20px;
  transition: all 100ms ease;

  &:hover {
    border: 2.5px solid white;
    cursor: pointer;
  }
`;

export const RoleIcon = styled.img`
  ${({ theme }) => theme.title === 'dark' && 'filter: invert(100%);'}
  opacity: 0.3;
  transition: all 200ms ease;
  height: 100%;
  padding: 0 5px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:focus {
    filter: invert(62%) sepia(71%) saturate(574%) hue-rotate(348deg)
      brightness(99%) contrast(97%);
  }

  &.selected {
    opacity: 1;
    filter: invert(62%) sepia(71%) saturate(574%) hue-rotate(348deg)
      brightness(99%) contrast(97%);
  }
`;

export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  max-height: 215px;
  overflow-y: scroll;

  div + div {
    margin-top: 5px;
  }
`;
