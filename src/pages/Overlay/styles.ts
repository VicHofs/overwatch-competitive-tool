import styled, { keyframes } from 'styled-components';

const fadeInDown = keyframes`
  from {
    transform: translateY(-15px);
  }
  to {
    transform: translateY(0);
  }
`;
const fadeInDownRotated = keyframes`
  from {
    transform: translateY(-15px) rotate(-3.8deg);
  }
  to {
    transform: translateY(0) rotate(-3.8deg);
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  aspect-ratio: 16 / 9;

  img {
    height: 100%;
    position: absolute;
    top: 0;
  }
`;

export const RankIcon = styled.video`
  height: 100%;
  position: absolute;
  top: 0;

  animation: ${fadeInDown} 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
  transition: 200ms all cubic-bezier(0.11, 0.53, 0.27, 1);
  opacity: 1;
  transform: translateY(0);
  &.exit {
    transform: translateY(15px);
    opacity: 0;
  }
`;

export const RankLabel = styled.p`
  user-select: none;
  font-size: 1.7vh;
  text-transform: uppercase;
  z-index: 10;
  position: absolute;
  top: 92.2vh;
  left: 16vh;
  transform: rotate(-3.8deg);
  font-family: OW2;
  color: #ceced0;

  animation: ${fadeInDownRotated} 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
  transition: 200ms all cubic-bezier(0.11, 0.53, 0.27, 1);
  opacity: 1;
  transform: translateY(0) rotate(-3.8deg);
  &.exit {
    transform: translateY(15px) rotate(-3.8deg);
    opacity: 0;
  }
`;
