import { Container as RankPickerContainer } from 'components/RankPicker/styles';
import styled from 'styled-components';

interface DividerProps {
  vertical?: boolean;
}

export const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

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
        : `${theme.colors.secondary}80`};

  &:focus {
    border-bottom: 3px solid ${({ theme }) => theme.colors.secondary};
  }

  &.filled {
    border-bottom: 3px solid ${({ theme }) => theme.colors.accent};
  }
`;

export const InputContainer = styled.span`
  height: 20px;
  display: flex;
  flex-direction: row;
  place-content: center;
  place-items: center;
  margin-bottom: 5;

  input:first-child {
    margin-right: 10px;
  }

  span {
    display: flex;
    flex-direction: row;
    height: 20px;
  }

  @media (max-width: 375px) {
    flex-direction: column;
    margin-bottom: 30px;

    ${RankPickerContainer} {
      margin-top: 25px;
    }

    input:first-child {
      margin-right: 0;
    }

    input + input {
      width: 165px;
    }

    span {
      margin-top: 10px;
      margin-bottom: 15px;
    }
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
    opacity: 0.75;
  }

  &:focus {
    opacity: 0.75;
  }

  &.selected {
    opacity: 1;
    filter: invert(62%) sepia(71%) saturate(574%) hue-rotate(348deg)
      brightness(99%) contrast(97%);

    &:hover {
      opacity: 0.75;
    }
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

export const Divider = styled.span<DividerProps>`
  background-color: ${({ theme }) => theme.colors.contrastSoft}30;
  ${({ vertical }) =>
    vertical
      ? 'width: 2px; height: 80%; margin: 0 15px;'
      : 'height: 2px; width: 80%; margin: 15px 0;'}
`;

export const TitleDivider = styled.span<DividerProps>`
  background-color: ${({ theme }) => theme.colors.accent};
  ${({ vertical }) =>
    vertical
      ? 'width: 20px; height: 15%; margin: 0 15px;'
      : 'height: 20px; width: 15%; margin: 15px 0;'}
`;
