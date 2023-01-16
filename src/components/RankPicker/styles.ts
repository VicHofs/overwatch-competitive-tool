import styled, { keyframes } from 'styled-components';

interface TierToggleSCProps {
  selected?: boolean;
  tier: number;
}

interface ContainerSCProps {
  forceExpanded?: boolean;
}

const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translateY(50%);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const fadeInDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-50%);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const fadeInLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(50%);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

const fadeInRight = keyframes`
from {
  opacity: 0;
  transform: translateX(-50%);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const EloContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  transition: all 200ms ease-out, opacity 0ms;
  display: flex;
  place-content: center;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.contrastSoft}00;
  border-radius: 5%;
  aspect-ratio: 1;
  height: 100%;
  max-width: 100%;

  img {
    aspect-ratio: 1;
    height: 160%;
    transform: translateY(2%);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.contrastSoft}20;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.contrastSoft}10 !important;
  }
`;

export const EloList = styled.div`
  padding-top: 52px;
  padding-bottom: 52px;
  z-index: 100;
  height: 156px;
  position: absolute;
  right: 0;
  top: -52px;
  width: 48.802px;
  overflow: scroll;
  * {
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  ${EloContainer} {
    height: 50px;
    margin-bottom: 2px;
    &.u {
      animation: ${fadeInUp} 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
    }
    &.d {
      animation: ${fadeInDown} 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
    }
  }

  @media (max-width: 375px) {
    display: flex;
    flex-direction: row;
    top: 10px;
    left: -50.802px;
    padding: initial;
    padding-left: 50.802px;
    padding-right: 50.802px;
    height: 50px;
    width: 152.406px;

    ${EloContainer} {
      flex-basis: 48.802px;
      flex-shrink: 0;
      aspect-ratio: initial;
      width: 48.802px !important;
      height: 50px;
      margin: initial;
      margin-right: 2px;
      &.u {
        animation: ${fadeInLeft} 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
      }
      &.d {
        animation: ${fadeInRight} 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
      }
    }
  }
`;

export const FadeOverlay = styled.div`
  height: 156px;
  width: 48.802px;
  position: absolute;
  right: 0;
  top: -52px;

  &:before {
    z-index: 150;
    content: '';
    width: 48.802px;
    height: 5px;
    position: absolute;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.primarySoft},
      transparent
    );
    top: 0;
  }

  &:after {
    z-index: 150;
    content: '';
    width: 48.802px;
    height: 5px;
    position: absolute;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.primarySoft}
    );
    bottom: 0;
  }

  @media (max-width: 375px) {
    bottom: 0;
    width: 156px;
    height: 48.802px;
    top: initial;
    left: -52px;

    &:before {
      height: 48.802px;
      width: 5px;
      background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.primarySoft},
        transparent
      );
      left: 0;
    }

    &:after {
      height: 48.802px;
      width: 5px;
      background: linear-gradient(
        to right,
        transparent,
        ${({ theme }) => theme.colors.primarySoft}
      );
      right: 0;
    }
  }
`;

export const TierToggle = styled.button<TierToggleSCProps>`
  transition-delay: ${({ tier }) => `${40 * tier}ms`} !important;
  cursor: pointer;
  transition: all 100ms ease-out, transform 50ms ease-out, opacity 50ms ease-out;
  display: flex;
  place-content: center;
  place-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.accent : `${theme.colors.contrastSoft}10`};
  border-radius: 15%;
  aspect-ratio: 1;
  border: none;
  // margin: 4%;
  color: ${({ theme, selected }) =>
    selected ? '#ffffff' : theme.colors.contrastSoft};
  font-weight: bold;
  font-family: 'Futura';
  font-size: 50%;

  &:hover,
  &:focus {
    background-color: ${({ theme, selected }) =>
      selected ? `${theme.colors.accent}` : `${theme.colors.contrastSoft}30`};
    color: ${({ theme, selected }) =>
      selected ? '#000000' : theme.colors.contrastSoft};
  }
`;

export const TierContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  aspect-ratio: 0.2;
  gap: 2%;

  @media (max-width: 375px) {
    flex-direction: row;
    aspect-ratio: initial;
    height: 10px;
    width: 100%;
  }
`;

export const Container = styled.div<ContainerSCProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 50px;
  gap: 2%;

  ${TierToggle} {
    ${({ forceExpanded }) =>
      forceExpanded
        ? ''
        : `opacity: 0;
    transform: translateX(100%);`}
  }

  &:hover,
  &:focus,
  &:focus-within {
    ${TierToggle} {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }

    ${EloContainer} {
      background-color: ${({ theme }) => theme.colors.contrastSoft}05;
    }
  }

  @media (max-width: 375px) {
    flex-direction: column;
    height: 60px;
    width: 48.802px;

    ${TierToggle} {
      ${({ forceExpanded }) =>
        forceExpanded
          ? ''
          : `
      transform: translateY(100%);`}
    }
  }
`;
