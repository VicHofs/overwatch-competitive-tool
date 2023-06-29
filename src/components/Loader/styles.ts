import styled, { keyframes } from 'styled-components';

interface LoaderContainerProps {
  color?: string;
}

const wave = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  50% {
    transform: translateY(-100%);
    opacity: .2;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Block = styled.div`
  box-sizing: border-box;
  aspect-ratio: 1;
  width: 21%;
  border-radius: 25%;

  animation: ${wave} 1.5s ease infinite;

  &:nth-child(3n + 2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3n + 3) {
    animation-delay: 0.4s;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const LoaderContainer = styled.div<LoaderContainerProps>`
  width: 56px;
  height: min-content;

  display: flex;
  flex-direction: row;
  gap: 18%;

  ${Block} {
    background-color: ${({ color }) => color || '#fff'};
  }
`;
