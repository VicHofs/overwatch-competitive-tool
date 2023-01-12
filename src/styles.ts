import styled from 'styled-components';

interface TeamContainerProps {
  teams?: number;
}

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

    input:first-child {
      margin-right: 0;
    }

    input + input {
      width: 165px;
    }

    span {
      margin-top: 10px;
    }
  }
`;

export const EmptyZone = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  place-content: center;
  place-items: center;

  * {
    user-select: none;
  }

  img {
    user-drag: none;
    height: 200px;
    max-height: 60vw;
    margin-bottom: 40px;
    opacity: 0.1;
    ${({ theme }) => (theme.title === 'dark' ? 'filter: invert();' : '')}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    font-weight: bold;
    font-size: min(10vw, 30px);
    text-align: center;
    color: ${({ theme }) => theme.colors.contrast}20;
  }

  p {
    font-weight: normal;
    font-size: min(8vw, 20px);
  }

  button {
    font-family: 'Industry';
    font-size: min(8vw, 20px);
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.contrast}20;
    background-color: #00000000;
    border: none;
    transition: opacity 200ms ease-out;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
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
    opacity: 1;
    filter: invert(46%) sepia(89%) saturate(2744%) hue-rotate(192deg)
      brightness(101%) contrast(99%);
  }

  &:focus {
    opacity: 1;
    filter: invert(46%) sepia(89%) saturate(2744%) hue-rotate(192deg)
      brightness(101%) contrast(99%);
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

export const TeamContainer = styled.div<TeamContainerProps>`
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  margin: 20px 0;
  ${({ teams }) => (teams ? `max-width: ${Math.ceil(teams / 2) * 320}px;` : '')}

  & > div {
    margin: 10px 10px;
  }
`;

export const BenchContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  margin-bottom: 20px;

  h3 {
    color: ${({ theme }) => theme.colors.contrastSoft};
    font-family: Futura;
    font-size: 25px;
    text-transform: uppercase;
    text-align: center;
    vertical-align: middle;
    margin-bottom: 10px;
  }

  div + div {
    margin-top: 5px;
  }
`;
