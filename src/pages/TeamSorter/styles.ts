import styled from 'styled-components';

interface TeamContainerProps {
  teams?: number;
}

export const EmptyZone = styled.div`
  padding-bottom: 50px;
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
