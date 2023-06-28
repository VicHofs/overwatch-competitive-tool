import { TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';

const pageTransitionIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const pageTransitionOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10%);
  }
`;

export const StyledTransitionGroup = styled(TransitionGroup)`
  .exit {
    width: 100%;
    position: absolute;
    top: 105px;
    left: 0;
    z-index: 1;
    opacity: 0.8;

    animation: ${pageTransitionOut} 500ms cubic-bezier(0.11, 0.53, 0.27, 1);
  }

  .enter {
    animation: ${pageTransitionIn} 500ms cubic-bezier(0.11, 0.53, 0.27, 1);
  }
`;
