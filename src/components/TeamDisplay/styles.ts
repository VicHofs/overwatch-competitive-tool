import styled from 'styled-components';

interface HeadingProps {
  color?: string;
}

interface StyleProps {
  animationDelay?: string;
}

export const Container = styled.div<StyleProps>`
  font-family: BigNoodle;
  font-style: italic;
  font-size: 35px;
  ${({ animationDelay }) =>
    animationDelay ? `animation-delay: ${animationDelay};` : ''}

  > span {
    display: flex;
    flex-direction: row;
    place-content: space-between;
    place-items: center;
    height: 80px;
    width: 300px;
  }

  sup {
    vertical-align: super;
    color: #b743ee;
    margin-left: 1px;
    font-size: 23px;
  }

  div {
    margin: 5px 0;
  }
`;

export const Heading = styled.span<HeadingProps>`
  transition: background-color 200ms ease-out;
  display: flex;
  flex-direction: row;
  place-content: space-between;
  place-items: center;
  height: 80px;
  padding: 0 20px;

  background-color: ${({ color }) => color ?? 'none'};
  color: white;

  > span {
    display: flex;
    flex-direction: row;
    place-content: center;
    place-items: center;
    height: 100%;
    width: max-content;
  }

  img {
    height: 70%;
    transform: scale(1.5);
    user-select: none;
  }
`;
