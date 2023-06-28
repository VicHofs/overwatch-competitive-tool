import styled from 'styled-components';
import { TitleDivider } from 'styles';

export const Container = styled.div`
  max-width: 520px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 30px;

  svg,
  p,
  h2 {
    transition: all 200ms cubic-bezier(0.11, 0.53, 0.27, 1);
  }

  &:hover {
    h2 {
      transform: translateX(10px);
    }

    svg {
      transform: scale(1.2);
    }

    p {
      color: ${({ theme }) => theme.colors.accent};
      opacity: 1;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    text-transform: uppercase;
    font-size: 50px;
  }

  ${TitleDivider} {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 0;
    margin-bottom: 10px;
    height: 13px;
  }

  p {
    font-size: 17px;
    font-family: Roboto;
    color: ${({ theme }) => theme.colors.contrastSoft};
    opacity: 0.8;
  }
`;
