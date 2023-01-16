import styled from 'styled-components';

export const Overlay = styled.span`
  ${({ theme }) => (theme.title === 'light' ? 'filter: invert();' : '')}
  display: flex;
  place-content: center;
  place-items: center;
  transition: opacity 200ms ease-out;
  z-index: 10;
  position: absolute;
  left: -10px;
  top: 0;
  height: 100%;
  width: calc(100% + 10px);
  background-color: #00000080;

  svg {
    opacity: 0.7;
    ${({ theme }) => (theme.title === 'light' ? 'filter: invert();' : '')}
  }
`;

export const Container = styled.div`
  transition: border-left 200ms ease-out;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  place-items: center;
  place-content: space-between;
  height: 50px;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.contrastSoft}30;
  padding: 0 10px 0 5px;

  font-family: BigNoodle, sans-serif;
  font-style: italic;
  font-size: 25px;

  span img {
    height: 100%;
    transform: scale(1.4);
  }

  > span {
    overflow: hidden;
    min-width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    word-break: keep-all;
  }

  img {
    height: 40%;
    margin-right: 5px;
  }

  .roleIcon {
    height: 50%;
    ${({ theme }) => (theme.title === 'light' ? 'filter: invert()' : '')}
  }

  ${Overlay} {
    opacity: 0;
  }

  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;
